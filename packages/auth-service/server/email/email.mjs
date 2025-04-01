// Sending emails with Nodemailer

import nodemailer from 'nodemailer';
import chalk from 'chalk';

const log = console.log

const transporter = nodemailer.createTransport({
    host: 'mail.shoppingarena.net',
    port: 465,
    secure: true,
    auth: {
        user: 'noreplay@shoppingarena.net',
        pass: process.env.EMAIL_PASSWORD_NET,
    },
})

export async function sendEmail(to, subject, text) {
    try {
        const info = await transporter.sendMail({
            from: '"Shopping Arena" <noreplay@shoppingarena.net>',
            to: to,
            subject: subject,
            text: text,

        })
        log(chalk.bgGreen("Message sent: %s"), info.messageId)
    } catch (error) {
        console.error('Error sending email:', error)
    }
}
export default sendEmail;