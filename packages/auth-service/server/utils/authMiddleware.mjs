// Authentication Verification Middlevare - Protects Routes by verifying Token
import { jwtVerify } from "jose"
import cookie from "cookie"
import { secretKey } from "../config/auth.mjs"

async function authVerifyMiddleware(req, res, next) {
    const cookies = cookie.parse(req.headers.cookie || "")
    console.log('AUTHMIDDLEWARE:Cookies:', cookies)
    const authHeader = req.headers
    //console.log('AUTHMIDDLEWARE:Auth Header:', authHeader)

    // Fix: Use the correct cookie name (ensure this matches what you set in login/refresh)
    const token = cookies.accessToken; // Ensure the cookie name is correct
    console.log("AUTHMIDDLEWARE: Access Token:", token);
    if (!token)
        // implement to direct/suggest user for register | login 
        return res.status(401).render('status', { title: 'Unauthorized - 401', message: "Unauthorized - accessToken not found", redirect: '/login' })

    try {
        // Fix: Ensure `secretKey` is a `Uint8Array`
        const keyBytes = secretKey instanceof Uint8Array ? secretKey : new TextEncoder().encode(secretKey);
        console.log("KeyBytes:", keyBytes);

        console.log('AUTHMIDDLEWARE: Attempting to verify token...')
        const { payload } = await jwtVerify(token, keyBytes)
        console.log('AUTHMIDDLEWARE:Verification Successful! Payload:', payload)
        req.user = payload // Store user info in rew.user
        console.log('AUTHMIDDLEWARE: req.user:', req.user)
        next()
    } catch (err) {
        console.log()
        // implement to get a new access token with call to POST/refresh with out logging in again
        return res.status(403).render('status', { title: 'Forbidden - 403', message: 'Invalid or expired accessToken', redirect: '/login' })

    }
}
export default authVerifyMiddleware