// Create a new DB
import sqlite3 from 'sqlite3';
import { execute } from './sql.mjs';

export const newDB = async (dbName) => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(`${dbName}.db`, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
};

export const initDB = async () => {
    try {
        const db = await newDB('main');
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
};
/*
let db;

initDB().then((initializedDB) => {
    db = initializedDB;
    console.log('Database and table initialized successfully.');
}).catch((err) => {
    console.error('Error initializing database:', err);
}); */