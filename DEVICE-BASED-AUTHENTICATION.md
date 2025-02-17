# DEVICE BASED AUTHENTICATION

## Use cases for Device Based Authentication

- Enfore Single Device Use
- Ensure Users Can’t Use the Same Refresh Token on Another Device

### EXAMPLE: Modify login to Generate a Unique Device ID

```js
import { randomUUID } from "crypto";

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    // Fetch user from the database
    const user = await get(db, `SELECT * FROM users WHERE username = '${username}'`);
    if (!user) return res.status(400).json({ error: "Invalid username or password" });

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" });

    // Generate a new device ID (if not already set)
    const deviceId = user.device_id || randomUUID();

    // Store device ID in the database
    if (!user.device_id) {
        await execute(db, `UPDATE users SET device_id = '${deviceId}' WHERE username = '${username}'`);
    }

    // Generate tokens tied to this device
    const accessToken = await generateToken({ username, email: user.email, deviceId }, "15m", secretKey);
    const refreshToken = await generateToken({ username, email: user.email, deviceId }, "7d", refreshKey);

    // Store refresh token in DB
    await execute(db, `UPDATE users SET refresh_token = '${refreshToken}', device_id = '${deviceId}' WHERE username = '${username}'`);

    // Send tokens in HTTP-only cookies
    res.setHeader("Set-Cookie", [
        cookie.serialize("token", accessToken, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 900, path: "/" }),
        cookie.serialize("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 604800, path: "/" }),
        cookie.serialize("deviceId", deviceId, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 604800, path: "/" }),
    ]);

    return res.status(200).json({ message: "Login successful", redirect: "/home" });
});

```
