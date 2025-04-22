// Al Email routes are handled here
import express from 'express'
import sendEmail from '../email/email.mjs'
import chalk from 'chalk'
import bodyParser from 'body-parser';
import multer from 'multer'

const upload = multer()
const log = console.log
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const emailRouter = express.Router()


emailRouter.get('/send-email', (req, res) => {
    res.render('send-email', { title: 'Send Email' })
})

emailRouter.post('/send-email', upload.none(),
    // https://expressjs.com/en/resources/middleware/multer.html
    async (req, res) => {
        log(chalk.yellow('POST /SEND-EMAIL'))
        const { to, subject, text } = req.body
        log(chalk.green('to: %s, subject: %s, text: %s'), to, subject, text)
        await sendEmail(to, subject, text)
        return res.status(200).json({
            message: 'Email sent successfully',
            redirect: '/send-email'
        });
    })

export default emailRouter