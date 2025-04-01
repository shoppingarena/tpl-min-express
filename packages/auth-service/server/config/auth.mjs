import chalk from 'chalk'
import dotenv from 'dotenv'
import { SignJWT } from 'jose'
import crypto from 'node:crypto'

dotenv.config()
/*
# Generate a Secure Secret Key for .env
You need a strong, random secret key for signing JWTs. You can generate one using Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
This will output a random 64-character hexadecimal string, which is secure for signing JWTs.
*/

console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY)

// Convert to Uint8Array consistently
const secretKey = process.env.JWT_SECRET_KEY
    ? new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    : crypto.randomBytes(32)

console.log('secretKey:', secretKey)

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
