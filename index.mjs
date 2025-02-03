import express from 'express'
import { body, validationResult } from 'express-validator'

import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

//TO-DO rewrite to node:path only, https://nodejs.org/en/learn/manipulating-files/nodejs-file-paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Directory name:', __dirname);

const app = express()
// request sends form-encoded data from html form, Parses URL-encoded form data
app.use(express.urlencoded({ extended: true }));
// JSON API request, Parses JSON request bodies
app.use(express.json());



app.set('view engine', 'pug')
// Disable Pug template caching
app.locals.cache = false

// Set the directory for the views
app.set('views', path.join(__dirname, 'server', 'views'));
console.log(`Path.join is: ${path.join(__dirname, 'server', 'views')}`)

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
    console.log(`Request object recieved by server is: ${res.req}`)
    console.log(`Response object send to client is: ${res}`)
})

app.get('/register', (req, res) => {
    res.render('register', { title: 'Register', subtitle: 'Create your account with a password' })

})

app.post('/register',
    [
        body('username').trim().isLength({ min: 4 }),
        body('email').trim().isEmail(),
        body('password').isLength({ min: 8 })
    ],
    (req, res) => {
        const myRequestBody = JSON.stringify(req.body)
        console.log(`This is the request body: ${myRequestBody}`); // Debugging
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.send(`
                    <script>
                        window.location.href = '/register'; // Redirect back to registration page
                        alert('All fields are required!');
                        
                    </script>
                    `);
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required!' });
        }
        res.send('Check your console for req.body output.')
        // console.log(`Username: ${username}, Email: ${email}, Password: ${password}`)
    })

app.get('/page', (req, res) => {
    res.render('page')
})




const PORT = 3000
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
    console.log(`Open http://localhost:${PORT} to see the app`)
})
