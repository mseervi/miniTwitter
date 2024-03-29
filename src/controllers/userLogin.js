import { authenticateUser } from "../repo/userLogin.repo.js";
import { handleErrors } from "../utils/errorHandler.js";
import { validateLoginUser } from "../utils/validation.js"

export const userLogin = async (req, res) => {
    try {
        const loginDetails = req.body
        const {isValid, errors} = validateLoginUser(loginDetails);
    
        if(!isValid) return res.status(400).send({
            isData: false,
            Message: "Login Failed",
            Error: errors
        })
        const user = await authenticateUser(loginDetails)
        return res.status(200).send(user);

    } catch (error) {
        return res.status(500).send(handleErrors(error))
    }
}