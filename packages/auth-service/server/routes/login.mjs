// Authentication POST Login
import express from 'express'
import multer from 'multer'
import { body, validationResult } from 'express-validator'
import { SignJWT } from 'jose'
import { execute, get } from '../db/sql.mjs'
import db from '../db/db.mjs';
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import chalk from 'chalk'
import cookie from 'cookie'

const loginRoute = express.Router()
const upload = multer()

loginRoute.post('/login', upload.none(),
    [
        body('username').trim().isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    ],
    async (req, res) => {
        console.log('DEBUG: Validate logins..');


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
                const user = await get(db, `SELECT * FROM users WHERE username = '${username}'`)
                console.log('User retrieved from database:', user); // Debugging
                if (!user) {
                    console.log('LOGIN: Username does not exist:', username);
                    return res.status(302).json({ message: 'Invalid username or ' })
                }

                console.log('DEBUG: Checking password...');

                //Check if password is correct
                const hashedPassword = user.password
                const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)
                if (!isPasswordCorrect) {
                    console.log(chalk.red('LOGIN: Password is incorrect.', password))
                    return res.status(400).json({ message: 'Invalid           or password is incorrect.' })
                }
                console.log('Password is correct...');
                return res.status(200).json({ message: 'Login Successful', redirect: '/home' })

            } catch (err) {
                console.error('Error logging in user:', err);
                res.status(500).send('Error logging in user.');
            }
        }
    }
)
export default loginRoute