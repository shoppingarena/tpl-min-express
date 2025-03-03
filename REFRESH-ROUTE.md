# REFRESH ROUTE

## How the Refresh Token Flow Works

1. The user logs in → receives:

    - accessToken (stored in a Secure HTTP-only cookie for authentication)
    - refreshToken (stored in another Secure HTTP-only cookie)

2. The user accesses protected routes using the accessToken.

3. When the accessToken expires, the client calls POST /refresh to get a new access token.

4. The server:

    - Verifies the refreshToken from the database.
    - Issues a new access token (valid for 15 min).
    - Sends the new accessToken as an HTTP-only cookie.

5. The user continues using the app without logging in again.

## Implement Token Refresh Route

```js
postRoute.post('/refresh', async (req, res) => {
    const cookies = cookie.parse(req.headers.cookie || "");
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ error: "No refresh token provided" });

    // Verify refresh token
    const user = await get(db, `SELECT * FROM users WHERE refresh_token = '${refreshToken}'`);
    if (!user) return res.status(403).json({ error: "Invalid refresh token" });

    try {
        const { payload } = await jwtVerify(refreshToken, refreshKey);
        const newAccessToken = await generateToken(payload, '15m', secretKey);

        res.setHeader('Set-Cookie', cookie.serialize('token', newAccessToken, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 900, path: '/' }));
        return res.status(200).json({ message: "Token refreshed" });
    } catch {
        return res.status(403).json({ error: "Invalid refresh token" });
    }
});
```

### Implement Token Refresh on client side in plain javascript

```js
 async function fetchWithAuth(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        credentials: "include", // Ensure cookies are sent
    });

    if (response.status === 401) { 
        console.warn("Access token expired, attempting to refresh...");
        const refreshResponse = await fetch("/refresh", {
            method: "POST",
            credentials: "include", 
        });

        if (refreshResponse.ok) {
            console.log("Access token refreshed, retrying request...");
            return fetch(url, {
                ...options,
                credentials: "include",
            });
        } else {
            console.error("Refresh token invalid. Redirecting to login...");
            window.location.href = "/login"; // Redirect to login if refresh fails
            return;
        }
    }

    return response;
}

```
