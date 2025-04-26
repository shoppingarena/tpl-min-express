// registerEmail.mjs
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

// Email content template with HTML formatting
const generateEmailContent = (username, email, url) => `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 4px;">
            <h1 style="color: #333;">Welcome to Shopping Arena! 🎉</h1>
            <p style="margin: 20px 0; color: #666;">Hello ${username},</p>
            <p style="margin: 15px 0; color: #666;">You've successfully registered on Shopping Arena!</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 4px; margin: 20px 0;">
                <h3 style="margin: 0; color: #333;">Your Account Details</h3>
                <ul style="list-style-type: none; margin: 15px 0; padding: 0;">
                    <li style="margin: 10px 0; font-weight: bold;">Username: ${username}</li>
                    <li style="margin: 10px 0; font-weight: bold;">Email: ${email}</li>
                </ul>
            </div>

            <p style="margin: 15px 0; color: #666;">Ready to get started? Here's what you need to do:</p>
            
            <a href="${url}" style="background-color: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0;">
                Login to Your Account
            </a>
        </div>
    </div>
`;

export async function sendRegisterEmail(to, subject, text, options = {}) {
    try {
        log(chalk.bgRedBright('--START-- sendEmail function'))

        const emailOptions = {
            ...options,
            from: 'Shopping Arena <noreplay@shoppingarena.net>',
            to: to,
            subject: subject,
            text: text,
            html: generateEmailContent(options.username, options.email, options.url)
        }

        const info = await transporter.sendMail(emailOptions)

        log(chalk.bgGreenBright('Message sent info.response:'), info.response)
        log(chalk.bgGreen("Message sent info.messageId: %s"), info.messageId),
            log(chalk.yellow(`To: ${to}, Subject: ${subject}, Text: ${text}`))

    } catch (error) {
        console.error('Error sending email:', error)
    }
}
export default sendRegisterEmail
