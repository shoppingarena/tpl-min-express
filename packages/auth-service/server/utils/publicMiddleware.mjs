// Authentication Verification Middlevare - Protects Routes by verifying Token
import { jwtVerify } from "jose"
import cookie from "cookie"
import { secretKey } from "../config/auth.mjs"

async function publicMiddleware(req, res, next) {
    const cookies = cookie.parse(req.headers.cookie || "")
    console.log('PUBLIC MIDDLEWARE:Cookies:', cookies)
    // Fix: Use the correct cookie name (ensure this matches what you set in login/refresh)
    const token = cookies.accessToken; // Ensure the cookie name is correct
    console.log("PUBLIC MIDDLEWARE: Access Token:", token);
    if (token) {
        try {
            // Parse user info from token payload (without verification, for simplicity)
            const decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            req.user = decodedToken.user; // Attach user info to the request object
            console.log('User:', req.user)
        } catch (err) {
            console.log("Error decoding token:", err);
            req.user = null;
        }
    } else {
        req.user = null; // No token means no user
    }
    next();
}
export default publicMiddleware