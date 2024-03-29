import { User } from "../models/userSchema.js";
import { handleErrors } from "../utils/errorHandler.js";
import { findUserById } from "../utils/findUser.js";

export const getUserById = async (userId) => {
    try {
        const user = await findUserById(userId);
        
        return {
            isData: true,
            data: user
        };
    } catch (error) {
        return handleErrors(error);
    }
};
