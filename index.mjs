import express from 'express'
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

//TO-DO rewrite to node:path only, https://nodejs.org/en/learn/manipulating-files/nodejs-file-paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Directory name:', __dirname);

const app = express()

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

app.get('/page', (req, res) => {
    res.render('page')
})




const PORT = 3000
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
    console.log(`Open http://localhost:${PORT} to see the app`)
})
