import express from 'express'
import dotenv from 'dotenv'
import coookieParser from 'cookie-parser'
import helmet, { crossOriginResourcePolicy } from 'helmet'
// import bcrypt from 'bcrypt' => postRouter.mjs
import db from './server/db/db.mjs'
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
// import crypto from 'node:crypto' => postRouter.mjs
// import { execute, get } from './server/db/sql.mjs'; => postRouter.mjs
// import chalk from 'chalk' => postRouter.mjs
import getRouter from './server/routes/getRouter.mjs'
import postRoute from './server/routes/postRouter.mjs'
import tailwindcss from 'tailwindcss'
import adminRoute from './server/routes/admin.mjs';
import emailRouter from './server/routes/emailRouter.mjs';
import routeXXX from './server/routes/routeXXX.mjs';
import cookieParser from 'cookie-parser'
import seedAdmin from './server/seedAdmin.mjs';

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';

dotenv.config()
//TO-DO rewrite to node:path only, https://nodejs.org/en/learn/manipulating-files/nodejs-file-paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

console.log('Directory name:', __dirname);

const app = express()
app.use(cookieParser())
// SECURE EXPRESS APP BY SETTING VARIOUS HTTP HEADERS
app.use(helmet())
// request sends form-encoded data from html form, Parses URL-encoded form data
app.use(express.urlencoded({ extended: true }));
// JSON API request, Parses JSON request bodies
app.use(express.json());

app.use('/static', express.static(path.join(__dirname, 'static')))

app.set('view engine', 'pug')
// Disable Pug template caching
app.locals.cache = false

// Set the directory for the views
app.set('views', path.join(__dirname, 'server', 'views'));
console.log(`Path.join is: ${path.join(__dirname, 'server', 'views')}`)

//Database connection


console.log(`index:Database connection: ${db}`)

//All imported routes are here
app.use(routeXXX)
app.use(getRouter)
app.use(postRoute)
app.use(adminRoute)
app.use(emailRouter)

app.delete('/delete', async (req, res) => {
    const { id } = req.body;
    try {
        await execute(db, `DELETE FROM users WHERE id = ${id}`);
        res.send('User deleted successfully.');
    } catch (err) {
        console.error('Error deleting user:', err);
    }
})
seedAdmin().then(() => {
    console.log("Admin seeding complete. Starting server...");
})

// Production PORT 443
const PORT = process.env.PORT || 3000;

console.log(`Server starting on port ${PORT} in ${process.env.NODE_ENV} mode`);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
    console.log(`Open http://localhost:${PORT} to see the app`)
})
