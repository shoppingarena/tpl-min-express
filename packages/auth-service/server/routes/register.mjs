//All basic POST requests are handled here
import express from 'express'
import { body, validationResult } from 'express-validator'
import { SignJWT } from 'jose'
import { execute, get } from '../db/sql.mjs'
import { initDB, newDB } from '../db/new-db.mjs';
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import chalk from 'chalk'
import cookie from 'cookie'

const registerRoute = express.Router()

// Create Database
let db;
initDB().then((initializedDB) => {
    db = initializedDB;
    console.log('Database and table initialized successfully.');
}).catch((err) => {
    console.error('Error initializing database:', err);
});

//Password saltRounds
const saltRounds = 10

//Generate a secret key (must be stored securely in .env in production)
const secretKey = crypto.randomBytes(32)
console.log(chalk.green('Secret key: '), secretKey.toString('hex'))

registerRoute.post('/register',
    [
        body('username').trim().isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
        body('email').trim().isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    ],
    async (req, res) => {
        const myRequestBody = JSON.stringify(req.body)
        console.log(`This is the request body:`); // Debugging
        console.dir(myRequestBody)
        const result = validationResult(req)
        if (result.isEmpty()) {
            const { username, email, password } = req.body;
            //res.send('Check your console for req.body output.')
            // console.log(`Username: ${ username }, Email: ${ email }, Password: ${ password }`)
            try {
                // Check if the username already exists
                const existingUser = await get(db, `SELECT * FROM users WHERE username = '${username}'`);
                if (existingUser) {
                    return res.status(400).send(`
        < script >
        window.onload = function () {
            alert('Username already exists. Please choose a different username.');
            window.location.href = '/register'; // Redirect back to registration page
        };
                            </script >
            `);
                } else {
                    // Check if the email already exists
                    const existingEmail = await get(db, `SELECT * FROM users WHERE email = '${email}'`);
                    if (existingEmail) {
                        return res.status(400).send(`
            < script >
            window.onload = function() {
                alert('Email already exists. Please use a different email.');
                window.location.href = '/register'; // Redirect back to registration page
            };
                        </script >
            `);
                    } else {
                        const hash = await bcrypt.hash(password, saltRounds)
                        //Create JWT token
                        const jwt = await new SignJWT({ username, email })
                            .setProtectedHeader({ alg: 'HS256' })
                            .setIssuedAt()
                            .setExpirationTime('2h')
                            .sign(secretKey)
                        console.log('Generated JWT:', jwt)
                        /* After succesfull registeration, Return JWT token to client.
                            User can use this token for authenticated requests.
                            201 status code means "Created"
                            redirect handle frontend script
                            Important! to send JWT token after registration.
                        */
                        await execute(db, `INSERT INTO users(username, email, password, jwt) VALUES('${username}', '${email}', '${hash}', '${jwt}')`)

                        //SECURE WAY TO SEND JWT TOKEN TO CLIENT AFTER REGISTRATION WITH SECURE COOKIE
                        res.setHeader('Set-Cookie', cookie.serialize('token', jwt, {
                            httpOnly: true, // Prevents JavaScript access (XSS Protection)
                            secure: false, // Set to true in production (HTTPS only
                            sameSite: 'strict', // Prevents CSRF attacks
                            maxAge: 60 * 60 * 2, // Token expiration time in seconds (2 hours)
                            path: '/', // Cookie path available for all routes
                        }))
                        // return res.status(201).json({ message: 'Registration successful', token: jwt, redirect: '/home' });
                        return res.status(201).json({ message: 'Registration successful', redirect: '/home' })
                        //res.redirect('/home')
                    }
                }
            } catch (err) {
                console.error('Error registering user:', err);
                res.status(500).send('Error registering user.');
            }
        } else {
            const errors = result.array(); // Define the errors variable here
            res.status(400).send(`
            < script >
            window.onload = function() {
                const errors = ${JSON.stringify(errors)
                };
        window.location.href = '/register'; // Redirect back to registration page
        alert('Validation errors:\\n' + errors.map(error => error.msg).join('\\n'));

    };</script >
        `);
        }

    })
export default registerRoute