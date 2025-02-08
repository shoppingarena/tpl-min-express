import express from 'express'
import helmet from 'helmet'
// import bcrypt from 'bcrypt' => postRouter.mjs
// import { initDB, newDB } from './server/db/new-db.mjs'; => postRouter.mjs
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
// import crypto from 'node:crypto' => postRouter.mjs
// import { execute, get } from './server/db/sql.mjs'; => postRouter.mjs
// import chalk from 'chalk' => postRouter.mjs
import getRoute from './server/getRouter.mjs'
import postRoute from './server/postRouter.mjs'
import tailwindcss from 'tailwindcss'






//TO-DO rewrite to node:path only, https://nodejs.org/en/learn/manipulating-files/nodejs-file-paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Directory name:', __dirname);

const app = express()
// SECURE EXPRESS APP BY SETTING VARIOUS HTTP HEADERS
app.use(helmet())
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


//All imported routes are here
app.use(getRoute)
app.use(postRoute)

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
