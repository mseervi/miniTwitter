import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const verifyUser = (req, res, next) => {
    try {
 
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                isData: false,
                message: "Authentication Failed: No token provided"
            });
        }

        const decoded = jwt.verify(token, config.SECRET_KEY);
        if (!decoded || !decoded.userId) {
            return res.status(401).json({
                isData: false,
                message: "Authentication Failed: Invalid token"
            });
        }

        if (decoded.exp <= Date.now() / 1000) {
            return res.status(401).json({
                isData: false,
                message: "Authentication Failed: Token has expired."
            });
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(500).json({
            isData: false,
            message: `Authentication Failed: ${error.message}`,
        });
    }
};
