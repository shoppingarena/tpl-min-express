//All basic POST requests are handled here
import express from 'express'
import registerRoute from './register.mjs'
import loginRoute from './login.mjs'
import logoutRoute from './logout.mjs'

const postRoute = express.Router()

postRoute.use(registerRoute)
postRoute.use(loginRoute)
postRoute.use(logoutRoute)

export default postRoute