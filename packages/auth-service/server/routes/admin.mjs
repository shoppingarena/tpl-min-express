// Admin Route
import express from "express"
import authVerifyMiddleware from "../utils/authMiddleware.mjs";

const adminRoute = express.Router()

adminRoute.get('/admin', authVerifyMiddleware, (req, res) => {
    res.render('admin', { title: 'Admin Page', user: req.user })
})

export default adminRoute