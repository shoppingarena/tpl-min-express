# Route Protection Table

Route       Method      Needs Authentication? Why?
/register   POST        ❌ No Users register without authentication.
/login      POST        ❌ No Users log in without authentication.
/refresh    POST        ❌ No Users refresh access tokens when expired.
/logout     POST        ✅ Yes Only logged-in users should log out.
/home       GET         ✅ Yes Home should only be accessible to authenticated users.
/profile    GET         ✅ Yes Profile data should only be available to the logged-in user.
/settings   GET/POST    ✅ Yes Users must be authenticated to change settings.
/admin      GET         ✅ Yes (with role check) Only admins should access admin routes.

[https://restfulapi.net/http-status-codes/]
[https://developer.mozilla.org/en-US/docs/Web/HTTP/Status]
[https://en.wikipedia.org/wiki/List_of_HTTP_status_codes]

## Role-Based access control (RBAC)

### Add admin route protection into authentication middleware

```js
async function authVerifyMiddleware(req, res, next) {
    const cookies = cookie.parse(req.headers.cookie || "");
    console.log("Cookies:", cookies);
    const token = cookies.accessToken;

    if (!token) return res.status(401).json({ message: "Unauthorized - accessToken not found" });

    try {
        const { payload } = await jwtVerify(token, secretKey);
        req.user = payload; // Store user info in req.user
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired accessToken" });
    }
}
// ADMIN PROTECTION MIDDLEWARE
export async function adminVerifyMiddleware(req, res, next) {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden - Admins only" });
    }
    next();
}

export default authVerifyMiddleware

```

#### Apply adminVerifyMiddlevare to admin routes

```js
import { adminVerifyMiddleware } from "../middleware/authMiddleware.mjs";
router.use("/admin", authVerifyMiddleware, adminVerifyMiddleware, adminRoute);

```
