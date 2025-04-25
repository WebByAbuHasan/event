import jwt from "jsonwebtoken";

const SECRET_KEY = "a3f9d7c1e8b5a4f2d6c3e7b9f1a2c4e5d7f8b9c0a1e2d3c4b5f6a7e8c9d0b1a2";
export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.headers['token'];
    if (!token) return res.status(401).json({ message: "Access Denied" });
    try {
        req.user = jwt.verify(token.replace("Bearer", ""), SECRET_KEY);
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};
