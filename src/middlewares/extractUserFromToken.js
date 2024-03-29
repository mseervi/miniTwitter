import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const extractUserFromToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                isData: false,
                Message: "Authentication Failed",
            });
        }

        const decoded = jwt.verify(token, config.SECRET_KEY);

        if (!decoded || !decoded.userId) {
            return res.status(401).json({
                isData: false,
                Message: "Authentication Failed",
            });
        }

        if (decoded.exp <= Date.now() / 1000) {
            return res.status(401).json({
                isData: false,
                Message: "Token has expired. Please log in again."
            });
        }

        const userId = decoded.userId;
        req.userId = userId;
        next();
    } catch (error) {
        console.error("Error in verifying user:", error);
        return res.status(500).json({
            isData: false,
            Message: "Internal Server Error",
        });
    }
};
