import bcrypt from "bcrypt";
import { User } from "../models/userSchema.js";
import { handleErrors } from "../utils/errorHandler.js";


//create user document
export const createUser = async (userDetails, otp) => {
    const { name, email, password } = userDetails;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        userName : name,
        email : email,
        password: hashedPassword,
        otp: otp
    };

    try {
        const existUser = await User.findOne({email});

        if(existUser){
            if(existUser.isVerified) {
                return {
                    isData: false,
                    message: "User Alreay Exist!"
                }
            } else {
                return {
                    isData: false,
                    message: "please Confirm your otp"
                }
            }
        }
        await User.create(newUser);
        return {
            isData: true,
            message: "Please Confirm OTP sent on Your email"
        }
    } catch (error) {
        return handleErrors(error);
    }
};

export const compareOTP = async(emailWithOTP) => {
    const email = emailWithOTP.email;
    const otp = emailWithOTP.otp;
    try {
        const user = await User.findOne({email})
        if(!user) return {
            isData: false,
            message: "No user Found!"
        }

        if(user.isVerified) return {
            message: " User Already Registered"
        }
        
        if(otp !== user.otp) return {
            isData : false,
            message: "Invalid OTP!"
        }
        
        user.isVerified = true;
         await user.save();
         return {
             isData: true,
             message: "User Registration Successfully",
             user: user
         }
        
         
    } catch (error) {
        return handleErrors(error)
    }
    
}


