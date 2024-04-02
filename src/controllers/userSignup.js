import { compareOTP, createUser } from "../repo/userSign.repo.js";
import { handleErrors } from "../utils/errorHandler.js";
import { nodemailerVerifyEmail } from "../utils/nodemailer.js";
import { validateSignupUser } from "../utils/validation.js";

export const userRegister = async (req, res) => {
    try {
        const userData = req.body;

        const { isValid, errors } = validateSignupUser(userData);
        if(!isValid){ 
            res.status(400).send({
                isData: false,
                message: "User Registration Failed!",
                error: errors
            })
            return;
        } 

        const otp = await nodemailerVerifyEmail(userData.email) 

       

        const response = await createUser(userData, otp);
        res.status(200).send(response);
        return

    } catch (error) {
        return res.status(500).send(handleErrors(error))
    }
}

export const otpConfirmation = async(req, res) => {
    try {
        const emailWithOTP = req.body;

        const response = await compareOTP(emailWithOTP);
        res.send(response)
    } catch (error) {
        return res.status(500).send(handleErrors(error))
    }
            
}