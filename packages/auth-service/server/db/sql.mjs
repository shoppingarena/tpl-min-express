import sqlite3 from 'sqlite3'
// In your db/sql.mjs file
export const execute = async (db, sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this); // 'this' contains lastID and changes properties
            }
        });
    });
};

export const get = async (db, sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};