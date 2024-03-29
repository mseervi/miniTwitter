import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import { User } from "../models/userSchema.js";
import config from "../config/config.js";
import { handleErrors } from "../utils/errorHandler.js";

//verify login user 
export const authenticateUser = async(loginDetails) => {

    try {
        const user = await User.findOne({email: loginDetails.email})

        if(!user) return {
            isData: false,
            message: "User Not Found!"
        }
    
        const comparePassword = await bcrypt.compare(loginDetails.password, user.password)
        if(!comparePassword) return {
            isData: false,
            message: "Incorrect Password"
        }
    
        const token = jwt.sign({userId: user._id}, config.SECRET_KEY)
        return {
            Message: `Login Successful!`,
            token : token
        }
    } catch (error) {
        return handleErrors(error);
    }

}