// Admin Route
import express from "express"
import authVerifyMiddleware from "../utils/authMiddleware.mjs";

const adminRoute = express.Router()

adminRoute.get('/admin', authVerifyMiddleware, (req, res) => {
    console.log('ADMIN ROUTE: req.user:', req.user);

    const username = req.user.username
    console.log('Username is: ', username)

    res.render('admin', { title: 'Admin Page', username: username })
})

export default adminRoute