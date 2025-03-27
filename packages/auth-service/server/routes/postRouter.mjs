//All basic POST requests are handled here
import express from 'express'
import registerRoute from './register.mjs'
import loginRoute from './login.mjs'
import logoutRoute from './logout.mjs'
import otpRouter from './otpRouter.mjs'

const postRoute = express.Router()

postRoute.use(registerRoute)
postRoute.use(loginRoute)
postRoute.use(logoutRoute)
postRoute.use(otpRouter)

export default postRoute