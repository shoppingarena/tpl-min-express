//All basic POST requests are handled here
import express from 'express'
import multer from 'multer'
import { body, validationResult } from 'express-validator'
import { SignJWT } from 'jose'
import { secretKey, refreshKey, generateToken } from '../config/auth.mjs'
import { execute, get } from '../db/sql.mjs'
import db from '../db/db.mjs';
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import chalk from 'chalk'
import cookie from 'cookie'


const registerRoute = express.Router()

// Create Database

//Password saltRounds
const saltRounds = 10

//Generate a secret key (must be stored securely in .env in production)
console.log(chalk.green('Secret key: '), secretKey.toString('hex'))

const upload = multer()

registerRoute.post('/register', upload.none(),
    [
        body('username').trim().isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
        body('email').trim().isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    ],
    async (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            const errors = result.array()
            return res.status(400).json({ message: "Validation errors:\n" + errors.map(error => error.msg).join("\n") })
        } else {
            const { username, email, password } = req.body;
            try {
                // Check if the username already exists
                const existingUser = await get(db, `SELECT * FROM users WHERE username = '${username}'`);
                if (existingUser) {
                    return res.status(400).json({ message: 'Username already exists. Please choose a different username.' })

                } else {
                    // Check if the email already exists
                    const existingEmail = await get(db, `SELECT * FROM users WHERE email = '${email}'`);
                    if (existingEmail) {
                        return res.status(400).json({ message: 'Email already exists. Please use a different email.' })

                    } else {
                        const hash = await bcrypt.hash(password, saltRounds)
                        // User Role is id 2 = user 
                        const role = 'user'
                        //Create JWT token
                        const accessToken = await generateToken({ username, email, role }, '15m', secretKey)
                        const refreshToken = await generateToken({ username, email, role }, '7d', refreshKey)

                        const result = await execute(db, `INSERT INTO users(username, email, password, refreshToken) VALUES(?, ?, ?, ?)`,
                            [username, email, hash, refreshToken]
                        )
                        const userId = result ? result.lastID : null
                        console.log('Inserted user ID:', userId)
                        const roleRow = await get(db, `SELECT id FROM roles WHERE name = ?`, [role])
                        const roleId = roleRow.id
                        console.log('roleId is:', roleId)
                        // Insert user roles to table
                        await execute(db, `INSERT INTO user_roles(user_id, role_id) VALUES(?, ?)`,
                            [userId, roleId]
                        )

                        //SECURE WAY TO SEND JWT TOKEN TO CLIENT AFTER REGISTRATION WITH SECURE COOKIE
                        res.setHeader('Set-Cookie', [
                            cookie.serialize('accessToken', accessToken, {
                                httpOnly: true, // Prevents JavaScript access (XSS Protection)
                                secure: false, // Set to true in production (HTTPS only
                                sameSite: 'strict', // Prevents CSRF attacks
                                maxAge: 60 * 60 * 2, // Token expiration time in seconds (2 hours) 900
                                path: '/'// Cookie path available for all routes
                            }),
                            cookie.serialize('refreshToken', refreshToken, {
                                httpOnly: true, // Prevents JavaScript access (XSS Protection)
                                secure: false, // Set to true in production (HTTPS only
                                sameSite: 'strict', // Prevents CSRF attacks
                                maxAge: 60 * 60 * 24 * 7, // Token expiration time in seconds (7 days) 604800
                                path: '/'// Cookie path available for all routes
                            })])
                        // return res.status(201).json({ message: 'Registration successful', token: jwt, redirect: '/home' });
                        return res.status(201).json({ message: 'Registration successful', redirect: '/home' })
                        //res.redirect('/home')
                    }
                }
            } catch (err) {
                console.error('Error registering user:', err);
                res.status(500).send('Error registering user.');
            }
        }
    }
)
export default registerRoute