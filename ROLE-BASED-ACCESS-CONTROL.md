# Role-Based Access Control (RBAC)

## How RBAC works?

1. Each User has a Role:

    - amin
    - editor
    - viewer

    **Each user in DB should have a role column to store the role of the user.**

2. Each Role has a set of Permissions:

    - admin: create, read, update, delete
    - editor: read, update
    - viewer: read

3. Each User can have multiple Roles:

    - User1: admin, editor
    - User2: viewer

4. Each Role can have multiple Users:

    - admin: User1, User3
    - editor: User1, User2
    - viewer: User2, User3

5. Each Permission can have multiple Roles:

    - create: admin
    - read: admin, editor, viewer
    - update: admin, editor
    - delete: admin

6. Each Permission can have multiple Users:

    - create: User1, User3
    - read: User1, User2, User3
    - update: User1, User3
    - delete: User1, User3

### Ensure the User Role is Included in JWT

```js
const accessToken = await generateToken({ username, email: user.email, role: user.role }, "15m", secretKey);
```

- Now each Token contains the user role.

### Create Role-Based Middleware

This middleware will check if the user has the correct role to access a route.

- roleMiddleware.mjs (Middleware to Restrict Access)

```js
export function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden - You do not have access" });
        }
        next();
    };
}

```

### Protect Routes Using Roles

```js
import express from "express";
import authVerifyMiddleware from "../middleware/authMiddleware.mjs";
import { authorizeRoles } from "../middleware/roleMiddleware.mjs";

const router = express.Router();

// Public Route - Anyone Can Access
router.get("/public", (req, res) => {
    res.json({ message: "Public Route - Anyone can access" });
});

// Protected Route - Only Authenticated Users
router.get("/profile", authVerifyMiddleware, (req, res) => {
    res.json({ message: "User Profile", user: req.user });
});

// Admin-Only Route
router.post("/admin", authVerifyMiddleware, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Admin Access Granted" });
});

// Editor and Admin Can Edit Content
router.post("/edit", authVerifyMiddleware, authorizeRoles("admin", "editor"), (req, res) => {
    res.json({ message: "Editor/Admin Can Edit Content" });
});

// Admin Can Delete Users
router.delete("/user", authVerifyMiddleware, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "User Deleted - Admin Only" });
});

export default router;

```

## RBAC vs ACL

### ACL (Access Control List)

- ACL is a list of permissions attached to an object.
- ACL is used to control access to an object.
- ACL is used to control access to a resource.
- ACL is used to control access to a file.
- ACL is used to control access to a folder.
- ACL is used to control access to a database.
- ACL is used to control access to a table.
- ACL is used to control access to a column.
- ACL is used to control access to a row.
- ACL is used to control access to a field.
- ACL is used to control access to a record.
- ACL is used to control access to a document.
- ACL is used to control access to a page.
- ACL is used to control access to a site.
- ACL is used to control access to a web application.
- ACL is used to control access to a web service.
- ACL is used to control access to a web API.
- ACL is used to control access to a web page.
- ACL is used to control access to a web form.
- ACL is used to control access to a web field.
- ACL is used to control access to a web record.
- ACL is used to control access to a web document.
- ACL is used to control access to a web page.
- ACL is used to control access to a web site.
- ACL is used to control access to a web application.
- ACL is used to control access to a web service.
- ACL is used to control access to a web API.
- ACL is used to control access to a web page.
- ACL is used to control access to a web form.
