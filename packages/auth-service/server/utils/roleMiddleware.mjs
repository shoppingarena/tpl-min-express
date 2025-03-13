// Role based middleware MUST have role: user.role in access token

export function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden - You do not have access" });
        }
        next();
    };
}