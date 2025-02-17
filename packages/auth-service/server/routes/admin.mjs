// Admin Route
import express from "express"
import authVerifyMiddleware from "../utils/authMiddleware.mjs";

const adminRoute = express.Router()

adminRoute.get('/admin', authVerifyMiddleware, (req, res) => {
    const user = JSON.stringify(req.user)

    console.log('ADMIN ROUTE: user:', user)
    const testjson = { username: 'jiri', email: 'email' }
    console.log('ADMIN ROUTE: testjson:', testjson)
    res.render('admin', { title: 'Admin Page', user: user })
})

export default adminRoute