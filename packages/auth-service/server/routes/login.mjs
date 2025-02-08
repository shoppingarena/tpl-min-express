// Authentication POST Login
import express from 'express'
import { body, validationResult } from 'express-validator'
import { SignJWT } from 'jose'
import { execute, get } from '../server/db/sql.mjs'
import { initDB, newDB } from '../server/db/new-db.mjs';
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import chalk from 'chalk'
import cookie from 'cookie'

const login = express.Router()


postRoute.post('/login',
    [
        body('username').trim().isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    ],
    async (req, res) => {
        console.log('DEBUG: Validate logins..');

        const { username, password } = req.body
        //Validate Login inputs
        const myRequestBody = JSON.stringify(req.body)
        console.log(`Submit Form request body: ${myRequestBody} `); // Debugging
        const result = validationResult(req)
        if (result.isEmpty()) {

            try {
                //Fetch user from database
                const user = await get(db, `SELECT * FROM users WHERE username = '${username}'`)
                console.log('User retrieved from database:', user); // Debugging
                if (!user) {
                    console.log('LOGIN: Username does not exist:', username);
                    //return res.status(401).send('Invalid username or password.');
                    //REDIRECT TO LOGIN
                    //return res.redirect(302, '/login')// Invalid username or password
                    return res.status(302).send(`
    < script >
    window.onload = function() {
        alert('Invalid username or password.');
        window.location.href = '/login'; // Redirect back to login
    };
    </script >
    `);
                }

                console.log('DEBUG: Checking password...');

                //Check if password is correct
                const isPasswordCorrect = await bcrypt.compare(password, user.password)
                if (!isPasswordCorrect) {
                    console.log(chalk.red('LOGIN: Password is incorrect.', password))
                    return res.status(400).send('Password is incorrect.')
                }

                console.log('Error comparing password:')
                return res.status(500).send('Internal Server Error')
                //.redirect('/home')



            } catch (err) {
                console.error('Error logging in user:', err);
                res.status(500).send('Error logging in user.');
            }
        } else {
            const errors = result.array(); // Define the errors variable here
            res.status(400).send(`
    < script >
    window.onload = function() {
        const errors = ${JSON.stringify(errors)
                };
alert('Validation errors:\\n' + errors.map(error => error.msg).join('\\n'));
window.location.href = '/login'; // Redirect back to login page
                    };
                </script >
    `);
        }
    }
)