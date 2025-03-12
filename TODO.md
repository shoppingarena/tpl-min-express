# TODO

- [ ] Implement One Time Password OTP [OTP.md](./OTP.md)
- [ ] SelfHost Icons [https://developers.google.com/fonts/docs/material_symbols#self-hosting_the_font]

- [ ] Create a new route for user profile
- [ ] Create a new route for user settings

- [X] Create a new route for user logout
- [X] Create a new route for user login
- [X] Create a new route for user register

- [ ] Create a new route for user dashboard
- [X] Create a new route for user home
- [X] Create a new route for user about
- [ ] Create a new route for user contact
- [ ] Create a new route for user help
- [ ] Create a new route for user privacy
- [ ] Create a new route for user terms

- [ ] Create a new route for user refresh token
- [ ] Create a new route for user verify email
- [ ] Create a new route for user reset password
- [ ] Create a new route for user change password
- [ ] Create a new route for user change email
- [ ] Create a new route for user change username
- [ ] Create a new route for user change profile picture
- [ ] Create a new route for user change profile background
- [ ] Create a new route for user change profile bio
- [ ] Create a new route for user change profile location
- [ ] Create a new route for user change profile website
- [ ] Create a new route for user change profile social media
- [ ] Create Admin Dashboard with only admin role permision has access to
- [ ] Implement multi-factor authentication (MFA) for better security
- [ ] Create / route index.pug  index.mjs
- [ ] Create Landing Page as main / route landingPage.pug extends index.pug landingPage.mjs
- [ ] Create /profile route is protected
- [ ] Create /setting route is protected
- [ ] Create /logout route

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
