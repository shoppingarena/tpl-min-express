// Create a new DB
import sqlite3 from 'sqlite3';
import { execute } from './sql.mjs';
import chalk from 'chalk';
import adminRoute from '../routes/admin.mjs';

const newDB = async (dbName) => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(`${dbName}.db`, (err) => {
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
                username TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                refreshToken TEXT NOT NULL UNIQUE,
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
const db = await initDB('coredb');
export default db