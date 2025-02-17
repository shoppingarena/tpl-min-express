# TODO

[ ] Implement multi-factor authentication (MFA) for better security
[ ] Create / route index.pug  index.mjs
[ ] Create Landing Page as main / route landingPage.pug extends index.pug landingPage.mjs
[ ] Create /profile route is protected
[ ] Create /setting route is protected
[ ] Create /logout route
[x] Create /login route
[x] Create /register route
[x] Create /dashboard route is protected
[ ] Create /home route is protected
[ ] Create /about route
[ ] Create /contact route
[ ] Create /help route
[ ] Create /privacy route
[ ] Create /terms route
[ ] Add a new route for refreshing token,
    Allow users to renew expired access token with out logging in again
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
