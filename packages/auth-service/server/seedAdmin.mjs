import { execute, get } from "./db/sql.mjs";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

async function seedAdmin() {
    // Check if there are any users in the database
    const existingUser = await get("SELECT * FROM users LIMIT 1");
    if (existingUser) {
        console.log("Admin user already exists. Skipping seed.");
        return;
    }

    // Create a default admin user
    const username = process.env.ADMIN_USERNAME || "admin";
    const email = process.env.ADMIN_EMAIL || "admin@example.com";
    const password = process.env.ADMIN_PASSWORD || "Admin123!";
    const hashedPassword = await bcrypt.hash(password, saltrounds);

    // Insert the admin user into the database
    await execute(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword]
    );

    // Get the newly created admin ID
    const admin = await get("SELECT id FROM users WHERE email = ?", [email]);

    // Assign the admin role
    await execute(
        "INSERT INTO user_roles (user_id, role_id) VALUES (?, (SELECT id FROM roles WHERE name = 'admin'))",
        [admin.id]
    );

    console.log(`Admin user created: ${username} (${email})`);
}

export default seedAdmin;
