import { User } from "../models/userSchema.js";


export const findUserById = async (userId) => {

    const user = await User.findById(userId);
    if (!user || !user.isVerified) {
        throw new Error(`User not found! ID: ${userId}`);
    }
    return user
}