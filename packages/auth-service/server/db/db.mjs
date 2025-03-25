// Create a new DB
import { __dirname } from '../utils/dirname.mjs';
import path from 'path';
import fs from 'fs';
import sqlite3 from 'sqlite3';
import { execute } from './sql.mjs';
import chalk from 'chalk';
import adminRoute from '../routes/admin.mjs';

const newDB = async (dbName) => {
    return new Promise((resolve, reject) => {
        // Navigate from 'server/db/' to 'server/database/'
        const dbDir = path.join(__dirname, '../database');
        console.log('DB: Directory name:', dbDir)
        const dbPath = path.join(dbDir, `${dbName}.db`);
        console.log('DB: Database path:', dbPath)
        // Ensure the database directory exists
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error opening database:', err);
                reject(err);
            } else {
                console.log(chalk.bgYellowBright('Connected to the database.', dbName))
                resolve(db);

            }
        });
    });
}
const initDB = async (newname) => {
    try {
        const db = await newDB(newname);
        console.log('Database created successfully:', db);

        // Ensure the users table exists
        await execute(db, `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT UNIQUE NOT NULL,
                refreshToken TEXT UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`)
        await execute(db, `
            CREATE TABLE IF NOT EXISTS roles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL);`)
        await execute(db, `
            CREATE TABLE IF NOT EXISTS user_roles (
                user_id INTEGER,
                role_id INTEGER,
                PRIMARY KEY (user_id, role_id),
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (role_id) REFERENCES roles(id)
                );`)
        await execute(db, `INSERT OR IGNORE INTO roles (name) VALUES ('admin')`);
        await execute(db, `INSERT OR IGNORE INTO roles (name) VALUES ('user')`);
        await execute(db, `INSERT OR IGNORE INTO roles (name) VALUES ('editor')`);


        console.log('Tables created successfully');
        return db;
    } catch (err) {
        console.error('Error creating database or table:', err);
        throw err;
    }
}
// Create and export a single 'db' instance
const db = await initDB('a3');
export default db