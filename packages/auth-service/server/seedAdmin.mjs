import { execute, get } from "./db/sql.mjs";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "./db/db.mjs";

dotenv.config();

async function seedAdmin() {
    try {
        // Check if there are any users in the database
        const existingUser = await get(db, `SELECT COUNT(*) as count FROM users`);
        if (existingUser && existingUser.count > 0) {
            console.log("Admin user already exists. Skipping seed.");
            return;
        }

        // Create a default admin user
        const username = process.env.ADMIN_USERNAME || "admin";
        const email = process.env.ADMIN_EMAIL || "admin@example.com";
        const password = process.env.ADMIN_PASSWORD || "Admin123!";
        const saltRounds = parseInt(process.env.SALTROUNDS || "10");
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        console.log("Database connection status:", db ? "Connected" : "Not connected");
        console.log("Username value:", username, "Type:", typeof username);
        console.log("Email value:", email, "Type:", typeof email);
        console.log("Password value:", hashedPassword?.length || "missing");

        // Begin transaction
        await db.run("BEGIN TRANSACTION");

        // Insert the admin user
        const insertResult = await execute(
            db,
            `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
            [username, email, hashedPassword]
        );

        // Get the newly created admin ID
        const admin = await get(
            db,
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );

        if (!admin || !admin.id) {
            throw new Error("Failed to retrieve admin ID after insertion");
        }

        console.log("Retrieved admin ID:", admin.id);

        // Assign admin role
        await execute(
            db,
            `INSERT INTO user_roles (user_id, role_id) VALUES (?, (SELECT id FROM roles WHERE name = 'admin'))`,
            [admin.id]
        );

        // Commit the transaction
        await db.run("COMMIT");
        console.log("Admin user created successfully");
    } catch (error) {
        // Rollback on error
        await db.run("ROLLBACK");
        console.error("Error creating admin:", error);
        throw error;
    }
}
export default seedAdmin
