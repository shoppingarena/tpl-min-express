// Create a new DB
import sqlite3 from 'sqlite3';
import { execute } from './sql.mjs';

const newDB = async (dbName) => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(`${dbName}.db`, (err) => {
            if (err) {
                console.error('Error opening database:', err);
                reject(err);
            } else {
                console.log('Connected to the database.', dbName);
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
                jwt TEXT NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
                
        `);
        console.log('Table created successfully');
        return db;
    } catch (err) {
        console.error('Error creating database or table:', err);
        throw err;
    }
}
// Create and export a single 'db' instance
const db = await initDB('coredb');
export default db