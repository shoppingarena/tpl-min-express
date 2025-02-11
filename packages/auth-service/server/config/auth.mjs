import chalk from 'chalk'
import dotenv from 'dotenv'
import { SignJWT } from 'jose'
import crypto from 'node:crypto'

dotenv.config()

// Ifno secretkey in .env, generate one for development only
const secretKey = process.env.JWT_SECRET_KEY || crypto.randomBytes(32)
const refreshKey = process.env.JWT_REFRESH_KEY || crypto.randomBytes(32)

const generateToken = async (user, expiresIn, key) => {
    return await new SignJWT(user)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(key)
        , console.log(chalk.bgCyan('Generating token'))
}

export { secretKey, refreshKey, generateToken }
