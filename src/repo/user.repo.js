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



//get all users
export const getAllUsrsFromMiniTwitter = async() => {
    try {
        const allUser = await User.find();
        if(!allUser) return {
            isData: false,
            message: "No User Found!"
        }
        return {
            isData: true,
            data: allUser
        }
    } catch (error) {
        return handleErrors(error)
    }
}
