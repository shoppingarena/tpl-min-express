// One Time Passwors otp
import { authenticator } from 'otplib'
import db from '../db/db.mjs'
import { execute } from '../db/sql.mjs';

const otp = async () => {
    // 
}

// Create Table
const create_otp_table = async () => {

    await db.execute(`CREATE TABLE IF NOT EXISTS otp_tbl (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    otp TEXT NOT NULL,
    expires_at DATETIME NOT NULL,
    verified BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    `)
    console.log("OTP table created.");
}

create_otp_table()

/* This table will store one-time passwords (OTPs) temporarily for verification.
It includes:
id (Primary Key) – Unique identifier for each OTP.
user_id (Foreign Key) – Links OTPs to users.
otp TEXT NOT NULL – Stores the one-time password
expires_at (DATETIME) – Stores the expiration time for the OTP
verified (BOOLEAN) – Whether the OTP has been used.
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE - Links user_id to the users table
created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp of OTP creation
*/


// OTP toggle ON | OFF
/* User feature to enable OTP
  

// Workflow for OTP