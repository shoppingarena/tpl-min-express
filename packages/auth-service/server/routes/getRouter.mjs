import express from 'express'
import authVerifyMiddleware from '../utils/authMiddleware.mjs'
import publicMiddleware from '../utils/publicMiddleware.mjs'

const getRoute = express.Router()

/* Midlleware which is specific to this router
const check-user-authentication = (req, res, next) => {
    console.log('check-user-authentication')
    next()
}
router.use(check-user-authentication)
*/
//Define Landing page as default page
getRoute.get('/', (req, res) => {
    res.render('index', { title: 'Jiri Beneš | Full-Stack JavaScript Developer' })
    //console.log(`Request object recieved by server is: ${res.req}`)
    //console.log(`Response object send to client is: ${res}`)
})


// Define the home page route
getRoute.get('/home', authVerifyMiddleware, (req, res) => {
    const username = req.user.username
    console.log('Username is: ', username)
    const role = req.user.role
    console.log('Role is: ', role)
    res.render('home', { title: 'Home', username: username })
})
// About page
getRoute.get('/about', publicMiddleware, (req, res) => {
    const username = req.user ? req.user.username : null; // Use the logged-in username if available
    res.render('about', { title: 'About', username })
})
getRoute.get('/portfolio', publicMiddleware, (req, res) => {
    const username = req.user ? req.user.username : null; // Use the logged-in username if available
    res.render('portfolio', { title: 'Portfolio', username })
})
getRoute.get('/contact', publicMiddleware, (req, res) => {
    const username = req.user ? req.user.username : null; // Use the logged-in username if available
    res.render('contact', { title: 'Contact', username })
})
// Define the register page route
getRoute.get('/register', (req, res) => {
    const cesta = req.baseUrl
    console.log(cesta)
    console.log(`middleware getRoute.get ${cesta}`)
    res.render('register', { title: 'Register', subtitle: 'Create account with a password' })
})

getRoute.get('/login', (req, res) => {
    res.render('login', { title: 'Login' })
})
getRoute.get('/logout', publicMiddleware, (req, res) => {
    const username = req.user ? req.user.username : null; // Use the logged-in username if available
    res.render('logout', { title: 'Logout', username })
})

getRoute.get('/page', (req, res) => {
    res.render('page')
})
getRoute.get('/dashboard', (req, res) => {
    res.render('dashboard')
})
getRoute.get('/icons', (req, res) => {
    res.render('icons', { title: 'Icons' })
})

export default getRoute;