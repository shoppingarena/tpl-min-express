//All basic POST requests are handled here
import express from 'express'
import registerRoute from './register.mjs'
import loginRoute from './login.mjs'

const postRoute = express.Router()

postRoute.use(registerRoute)
postRoute.use(loginRoute)

export default postRoute