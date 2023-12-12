export const authMiddleware = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            console.error("Unauthorized access detected:", req.user);
            return res.status(403).json({ error: "Not authorized" });
        }
        next();
    };
};