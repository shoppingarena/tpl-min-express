// Authentication POST Login
import express from 'express'
import multer from 'multer'
import { body, validationResult } from 'express-validator'
import { SignJWT } from 'jose'
import { execute, get } from '../db/sql.mjs'
import db from '../db/db.mjs';
import bcrypt from 'bcrypt'
import { secretKey, refreshKey, generateToken } from '../config/auth.mjs'
import crypto from 'node:crypto'
import chalk from 'chalk'
import cookie from 'cookie'
import authVerifyMiddleware from "../utils/authMiddleware.mjs";
import { Console } from 'node:console'

const loginRoute = express.Router()
const upload = multer()
const log = console.log

loginRoute.post('/login', upload.none(),
    [
        body('username').trim().isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    ],
    async (req, res) => {
        log(chalk.rgb(112, 8, 231)('DEBUG: Validate logins..'))


        //Validate Login inputs
        const myRequestBody = JSON.stringify(req.body)
        console.log(`Submit Form request body: ${myRequestBody} `); // Debugging
        const result = validationResult(req)
        if (!result.isEmpty()) {
            const errors = result.array(); // Define the errors variable here
            res.status(400).json({ message: "Validation errors:\n" + errors.map(error => error.msg).join("\n") })
        } else {
            try {
                //Fetch user from database
                const { username, password } = req.body
                const user = await get(db, `SELECT * FROM users WHERE username = ?`, [username])
                // Debugging data from DB
                console.log('Raw user data from DB:', user.username)
                console.log(chalk.yellowBright('User retrieved from database:', user.username)) // Debugging
                if (!user) {
                    console.log(chalk.red('LOGIN: Username does not exist:', user.username))
                    return res.status(302).json({ message: 'Invalid username or ' })
                }

                log(chalk.rgb(112, 8, 231)('DEBUG: Checking password...'))

                //Check if password is correct
                const hashedPassword = user.password
                console.log('User hashed password from DB:', user.password)
                const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)
                if (!isPasswordCorrect) {
                    console.log(chalk.red('LOGIN: Password is incorrect.', password))
                    return res.status(400).json({ message: 'Invalid           or password is incorrect.' })
                }
                log(chalk.rgb(112, 8, 231)('Password is correct...'))
                // Generate new access and refresh tokens
                const accessToken = await generateToken({ username, email: user.email }, '15m', secretKey)
                const refreshToken = await generateToken({ username, email: user.email }, '7d', refreshKey)
                // Update DB with refreshToken
                await execute(db, `UPDATE users SET refreshToken  = '${refreshToken}' WHERE username = '${username}'`)
                // Securely send cookies to client with tokens 
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
                return res.status(200).json({ message: 'Login Successful', redirect: '/home' })



            } catch (err) {
                console.error('Error logging in user:', err);
                res.status(500).send('Error logging in user.');
            }
        }
    }
)
export default loginRoute