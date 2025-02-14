# TODO

[ ] for 404 status add sign in form to be inform about requested resource in future
[X] 401, 403, 404, 405 status redirect|render in routes/routeXXX.mjs vies/status.pug
[x] JWT Verification Middleware server/utils/authMiddleware.js
[ ] add Authorisation middleware to protect routes
[X] add refresh token

[ ] update fetch[login, register]

```js
    const response = await fetch('/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
});
```

[x] add to frontend script to inform failed register
[X] login instead of alert popup
[ ] authentication for user

[ ] Update PUG template system, <https://chatgpt.com/c/679a4cf8-cb50-8009-983e-63b2ee7482ec>
