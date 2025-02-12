// RefreshToken Route allows users to renew expired access token.
import { cookie, ExpressValidator } from "express-validator";
import { ResultWithContextImpl } from "express-validator/lib/chain";
import { get } from "http";
import db from "../db/db.mjs";
import { jwtVerify } from "jose";
import { generateToken, refreshKey, secretKey } from "../config/auth.mjs";

// Refresh Token Route
const refreshRoute = Express.Router()

refreshRoute.post('/refresh', async (req, res) => {
    const cookies = cookie.parse(req.headers.cookie || "")
    const refreshToken = cookies.refreshToken
    // if there is no refreshToken
    if (!refreshToken) return res.status(401).json({ message: 'No refresh token provided' })

    // if there is refreshToken let Verify it
    const user = await get(db, `SELECT * FROM users WHERE refreshToken = '${refreshToken}'`)
    // if there is no user with this refreshToken
    if (!user) return res.status(403).json({ message: 'No user found with refreshToken' })

    try {
        // if there is user with this refreshToken let Verify it
        const { payload } = await jwtVerify(refreshToken, refreshKey)
        // Generate new accessToken
        const accessToken = await generateToken(payload, '15m', secretKey)
        // Send new accessToken to client
        res.setHeader('Set-Cookie', cookie.serialize('token', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 60 * 15,
            path: '/'
        }
        ))
        return res.status(200).json({ message: 'AccessToken refreshed' })
    } catch {
        return res.status(403).json({ message: 'Invalid refresh token' })
    }
})
export default refreshRoute