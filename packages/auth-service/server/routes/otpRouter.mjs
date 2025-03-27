// OTP Router 
import express from 'express'
import authVerifyMiddleware from '../utils/authMiddleware.mjs'
import otp from './otp.mjs'

const otpRouter = express.Router()

otpRouter.post('/otp', authVerifyMiddleware, (req, res, next) => {
    console.log('Request body:', req.body.otp)
    const otpValue = req.body.otp
    if (otpValue === 'OFF') {
        console.log('OTP is OFF')
        return res.redirect('/settings')
    }
    else if (otpValue === 'ON') {
        console.log('OTP is ON')
        otp.createOtpTable()
        return next()
    }
})

export default otpRouter

