import { createUser } from "../repo/userSign.repo.js";
import { handleErrors } from "../utils/errorHandler.js";
import { validateSignupUser } from "../utils/validation.js";
import {  verifyEmailAddress } from "../utils/emailVerification.js";

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

        const isEmailVerified = await verifyEmailAddress(userData.email);

        if (!isEmailVerified.isData) {
            return res.status(400).send({
                isData: false,
                error: isEmailVerified.message
            });
        }

        const response = await createUser(userData);
        res.status(200).send(response);
        return

    } catch (error) {
        return res.status(500).send(handleErrors(error))
    }
}