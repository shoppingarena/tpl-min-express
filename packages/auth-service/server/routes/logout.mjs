// logoutRoute render logout.pug template
import express from 'express'
import cookie from 'cookie'

const logoutRoute = express.Router()

logoutRoute.post('/logout', (req, res) => {
    res.setHeader('Set-Cookie', [
        cookie.serialize('accessToken', "", {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 0,
            path: '/'
        }),
        cookie.serialize('refreshToken', "", {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 0,
            path: '/'
        })
    ])
    console.log('Logout success', req.cookies)
    res.redirect('/home')
})

export default logoutRoute