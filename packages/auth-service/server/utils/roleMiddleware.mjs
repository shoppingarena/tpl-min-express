// Role based middleware MUST have role: user.role in access token
export function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        console.log('ROLES AUTHORIZATION MIDDLEWARE: req.user =', req.user);

        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: "Forbidden - No role found" });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden - You do not have access" });
        }

        next();
    };
}
