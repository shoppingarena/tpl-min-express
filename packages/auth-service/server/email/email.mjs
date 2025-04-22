// email.mjs
// Sending emails with Nodemailer
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import chalk from 'chalk';

const log = console.log;
// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
// Load environment variables first
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// Create transporter with credentials from environment variables
const transporter = nodemailer.createTransport({
    host: 'mail.shoppingarena.net',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USERNAME || 'noreplay@shoppingarena.net', // You can set this to your actual email or another placeholder
        pass: process.env.EMAIL_PASSWORD,
    },
});

export async function sendEmail(to, subject, text) {
    try {
        log(chalk.bgRedBright('--START-- sendEmail function'))

        const info = await transporter.sendMail({
            from: 'Shopping Arena <noreplay@shoppingarena.net>',
            to: to,
            subject: subject,
            text: text,

        })
        log(chalk.bgGreenBright('Message sent info.response:'), info.response)
        log(chalk.bgGreen("Message sent info.messageId: %s"), info.messageId),
            log(chalk.yellow(`To: ${to}, Subject: ${subject}, Text: ${text}`))

    } catch (error) {
        console.error('Error sending email:', error)
    }
}
export default sendEmail
