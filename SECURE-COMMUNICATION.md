# Secure Communication

The secure, industry-standard way to send form data to a server involves using best practices for securing data in transit and ensuring the integrity of the data and the system.

1. Use HTTPS for Secure Communication
Ensure that your server is using HTTPS (SSL/TLS) to encrypt data in transit.
Without HTTPS, sensitive data (like passwords) sent through a POST request can be intercepted by attackers.

2. Sanitize and Validate Input on the Server
Never trust data sent from the client. Always validate and sanitize input on the server to prevent malicious input, such as SQL injection, XSS, or other attacks.

- express-validator
- bcrypt, hash password with saltRounds, compare password
- jwt token is created during registration in backend and sent to frontend
- secure cookie is used to store jwt token in frontend

Send the JWT securely from the server.
Store the JWT securely in the browser.
Use the JWT for authenticated requests after login.
Verify the JWT on the client side and redirect users.
