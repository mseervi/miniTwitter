import bcrypt from "bcrypt";
import { User } from "../models/userSchema.js";
import { handleErrors } from "../utils/errorHandler.js";

//create user document
export const createUser = async (userDetails) => {
    const { name, email, password } = userDetails;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        userName : name,
        email : email,
        password: hashedPassword 
    };

    try {
        const existUser = await User.findOne({email});
        if(existUser) return {
            isData: false,
            Message: "User Alreay Exist!"
        }
        await User.create(newUser);
        return {
            isData: true,
            Message: "User Created Succssfully"
        }
    } catch (error) {
        return handleErrors(error);
    }
};


