import chalk from 'chalk'
import dotenv from 'dotenv'
import { SignJWT } from 'jose'
import crypto from 'node:crypto'

dotenv.config()

// Convert to Uint8Array consistently
const secretKey = process.env.JWT_SECRET_KEY
    ? new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    : crypto.randomBytes(32)

const refreshKey = process.env.JWT_REFRESH_KEY
    ? new TextEncoder().encode(process.env.JWT_REFRESH_KEY)
    : crypto.randomBytes(32)


const generateToken = async (user, expiresIn, key) => {
    console.log(chalk.bgCyan('CONFIG/AUTH:Generating token'))

    return await new SignJWT({ user })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(key)
}

export { secretKey, refreshKey, generateToken }
