import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/configenv.js";

const verifyJWT = (req, res, next) => {
    try {
        // Check if authorization header exists
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing or invalid"
            });
        }

        // Extract token by removing 'Bearer ' prefix
        const token = authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        // Verify token and add user data to request
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded; // Store decoded user info for later use
        next();

    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

export default verifyJWT;