import express from 'express'
import dotenv from 'dotenv'
import coookieParser from 'cookie-parser'
import helmet, { crossOriginResourcePolicy } from 'helmet'
// import bcrypt from 'bcrypt' => postRouter.mjs
import db from './server/db/db.mjs'
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
// import crypto from 'node:crypto' => postRouter.mjs
// import { execute, get } from './server/db/sql.mjs'; => postRouter.mjs
// import chalk from 'chalk' => postRouter.mjs
import getRouter from './server/routes/getRouter.mjs'
import postRoute from './server/routes/postRouter.mjs'
import tailwindcss from 'tailwindcss'
import adminRoute from './server/routes/admin.mjs';
import emailRouter from './server/routes/emailRouter.mjs';
import routeXXX from './server/routes/routeXXX.mjs';
import cookieParser from 'cookie-parser'
import seedAdmin from './server/seedAdmin.mjs';
import http from 'http';
import os from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';

// Create the promisified version of exec
const execAsync = promisify(exec);


// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';

dotenv.config()
//TO-DO rewrite to node:path only, https://nodejs.org/en/learn/manipulating-files/nodejs-file-paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

console.log('Directory name:', __dirname);

// Get local IP address
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        const networkInterface = interfaces[interfaceName];
        for (const iface of networkInterface) {
            // Skip over non-IPv4 and internal interfaces
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost'; // Fallback
}

// Get Windows host IP when running in WSL
async function getWindowsHostIP() {
    try {
        // This typically works in WSL to get the Windows host IP
        const { stdout } = await execAsync('cat /etc/resolv.conf | grep nameserver | awk \'{print $2}\'');
        return stdout.trim();
    } catch (error) {
        console.error('Failed to get Windows host IP:', error);
        return 'localhost';
    }
}

const localIP = getLocalIP();

const app = express()
app.use(cookieParser())
// SECURE EXPRESS APP BY SETTING VARIOUS HTTP HEADERS
app.use(helmet())
// request sends form-encoded data from html form, Parses URL-encoded form data
app.use(express.urlencoded({ extended: true }));
// JSON API request, Parses JSON request bodies
app.use(express.json());

app.use('/static', express.static(path.join(__dirname, 'static')))

app.set('view engine', 'pug')
// Disable Pug template caching
app.locals.cache = false

// Set the directory for the views
app.set('views', path.join(__dirname, 'server', 'views'));
console.log(`Path.join is: ${path.join(__dirname, 'server', 'views')}`)

//Database connection


console.log(`index:Database connection: ${db}`)

//All imported routes are here
app.use(routeXXX)
app.use(getRouter)
app.use(postRoute)
app.use(adminRoute)
app.use(emailRouter)

app.delete('/delete', async (req, res) => {
    const { id } = req.body;
    try {
        await execute(db, `DELETE FROM users WHERE id = ${id}`);
        res.send('User deleted successfully.');
    } catch (err) {
        console.error('Error deleting user:', err);
    }
})
seedAdmin().then(() => {
    console.log("Admin seeding complete. Starting server...");
})

// Production PORT 443
const PORT = process.env.PORT || 3000;

console.log(`Server starting on port ${PORT} in ${process.env.NODE_ENV} mode`);


// Listen on all interfaces (0.0.0.0)
app.listen(PORT, '0.0.0.0', async () => {
    console.log(`Server running at:`);
    console.log(`- http://localhost:${PORT}`);
    console.log(`- http://${localIP}:${PORT}`);

    // If running in WSL, also show Windows host IP
    try {
        const isWSL = process.platform === 'linux' &&
            (process.env.WSL_DISTRO_NAME || process.env.IS_WSL);

        if (isWSL) {
            const windowsIP = await getWindowsHostIP();
            console.log(`- Windows host: http://${windowsIP}:${PORT}`);
        }
    } catch (error) {
        console.error('Error checking WSL environment:', error);
    }
});

