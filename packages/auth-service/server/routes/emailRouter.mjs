// Al Email routes are handled here
import express from 'express'
import sendEmail from '../email/email.mjs'
import chalk from 'chalk'
import bodyParser from 'body-parser';

const log = console.log
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const emailRouter = express.Router()


emailRouter.get('/send-email', (req, res) => {
    res.render('send-email', { title: 'Send Email' })
})

emailRouter.post('/send-email', urlencodedParser,
    async (req, res) => {
        log(chalk.yellow('POST /SEND-EMAIL'))
        const { to, subject, text } = req.body
        log(chalk.green('to: %s, subject: %s, text: %s'), to, subject, text)
        await sendEmail(to, subject, text)
        res.json({ message: 'Email sent successfully' })
    })

export default emailRouter