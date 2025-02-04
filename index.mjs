import express from 'express'
import { body, validationResult } from 'express-validator'
import { initDB, newDB } from './server/db/new-db.mjs';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

import { execute, get } from './server/db/sql.mjs';
import { Console } from 'node:console';


//TO-DO rewrite to node:path only, https://nodejs.org/en/learn/manipulating-files/nodejs-file-paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Directory name:', __dirname);

const app = express()
// request sends form-encoded data from html form, Parses URL-encoded form data
app.use(express.urlencoded({ extended: true }));
// JSON API request, Parses JSON request bodies
app.use(express.json());

// Create Database
let db;
initDB().then((initializedDB) => {
    db = initializedDB;
    console.log('Database and table initialized successfully.');
}).catch((err) => {
    console.error('Error initializing database:', err);
});

app.set('view engine', 'pug')
// Disable Pug template caching
app.locals.cache = false

// Set the directory for the views
app.set('views', path.join(__dirname, 'server', 'views'));
console.log(`Path.join is: ${path.join(__dirname, 'server', 'views')}`)

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
    //console.log(`Request object recieved by server is: ${res.req}`)
    //console.log(`Response object send to client is: ${res}`)
})

app.get('/home', (req, res) => [
    res.render('index', { title: 'Home' })
])

app.get('/register', (req, res) => {
    res.render('register', { title: 'Register', subtitle: 'Create your account with a password' })

})

app.post('/register',
    [
        body('username').trim().isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
        body('email').trim().isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    ],
    async (req, res) => {
        const myRequestBody = JSON.stringify(req.body)
        console.log(`This is the request body: ${myRequestBody}`); // Debugging
        const result = validationResult(req)
        if (result.isEmpty()) {
            const { username, email, password } = req.body;
            //res.send('Check your console for req.body output.')
            // console.log(`Username: ${username}, Email: ${email}, Password: ${password}`)
            try {
                // Check if the username already exists
                const existingUser = await get(db, `SELECT * FROM users WHERE username = '${username}'`);
                if (existingUser) {
                    return res.status(400).send(`
                            <script>
                                window.onload = function() {
                                    alert('Username already exists. Please choose a different username.');
                                    window.location.href = '/register'; // Redirect back to registration page
                                };
                            </script>
                        `);
                } else {
                    // Check if the email already exists
                    const existingEmail = await get(db, `SELECT * FROM users WHERE email = '${email}'`);
                    if (existingEmail) {
                        return res.status(400).send(`
                        <script>
                            window.onload = function() {
                            alert('Email already exists. Please use a different email.');
                            window.location.href = '/register'; // Redirect back to registration page
                            };
                        </script>
                    `);
                    } else {
                        await execute(db, `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`);
                        //res.send('User registered successfully.')
                        res.redirect('/home')
                    }
                }
            } catch (err) {
                console.error('Error registering user:', err);
                res.status(500).send('Error registering user.');
            }
        } else {
            const errors = result.array(); // Define the errors variable here
            res.status(400).send(`
                <script>
                    window.onload = function() {
                        const errors = ${JSON.stringify(errors)};
                        window.location.href = '/register'; // Redirect back to registration page
                        alert('Validation errors:\\n' + errors.map(error => error.msg).join('\\n'));
                        
                    };</script>
            `);
        }

    })


app.get('/page', (req, res) => {
    res.render('page')
})

app.delete('/delete', async (req, res) => {
    const { id } = req.body;
    try {
        await execute(db, `DELETE FROM users WHERE id = ${id}`);
        res.send('User deleted successfully.');
    } catch (err) {
        console.error('Error deleting user:', err);
    }
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
    console.log(`Open http://localhost:${PORT} to see the app`)
})
