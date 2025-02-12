// Authentication Verification Middlevare - Protects Routes by verifying Token
import { jwtVerify } from "jose"
import cookie from "cookie"
import { secretKey } from "../config/auth.mjs"

async function authVerifyMiddleware(req, res, next) {
    const cookies = cookie.parse(req.headers.cookie || "")
    console.log('Cookies:', cookies)

    // Fix: Use the correct cookie name (ensure this matches what you set in login/refresh)
    const token = cookies.accessToken; // Ensure the cookie name is correct
    console.log("Access Token:", token);
    if (!token) return res.status(401).json({ message: "Unauthorized - accessToken not found" })

    try {
        // Fix: Ensure `secretKey` is a `Uint8Array`
        const keyBytes = secretKey instanceof Uint8Array ? secretKey : new TextEncoder().encode(secretKey);
        console.log("KeyBytes:", keyBytes);

        console.log('Attempting to verify token...')
        const { payload } = await jwtVerify(token, keyBytes)
        console.log('Verification Successful! Payload:', payload)
        req.user = payload // Store user info in rew.user
        next()
    } catch (err) {
        console.log()
        return res.status(403).json({ message: 'Invalid or expired accessToken' })
    }
}
export default authVerifyMiddleware