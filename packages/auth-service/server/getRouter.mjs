import express from 'express'

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
    res.render('index', { title: 'Landing page', message: 'Hello From Landing Page!' })
    //console.log(`Request object recieved by server is: ${res.req}`)
    //console.log(`Response object send to client is: ${res}`)
})


// Define the home page route
getRoute.get('/home', (req, res) => [
    res.render('index', { title: 'Home' })
])

// Define the register page route
getRoute.get('/register', (req, res) => {
    const cesta = req.baseUrl
    console.log(req.baseUrl)
    console.log(`middleware getRoute.get ${cesta}`)
    res.render('register', { title: 'Register', subtitle: 'Create account with a password' })
})

getRoute.get('/login', (req, res) => {
    res.render('login', { title: 'Login' })
})

getRoute.get('/page', (req, res) => {
    res.render('page')
})

export default getRoute;