// email.mjs
// Sending emails with Nodemailer
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const log = console.log;

// Load environment variables first
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Determine which .env file to use based on the environment
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
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

// Export transporter for usage in other modules
export default transporter;