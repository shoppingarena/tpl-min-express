import sqlite3 from 'sqlite3'

export const execute = async (db, sql) => {
    return new Promise((resolve, reject) => {
        db.run(sql, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })

}

export const get = async (db, sql) => {
    return new Promise((resolve, reject) => {
        db.get(sql, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};
