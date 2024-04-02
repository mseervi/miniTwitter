import { checkPrivacyAndGetUser } from "../repo/getUserById.repo.js";
import { handleErrors } from "../utils/errorHandler.js";


export const checkAndGetUser = async(req, res) => {
    try {
        const userId = req.params.userId;

        const user = await checkPrivacyAndGetUser(userId);
        res.send(user);
    } catch (error) {
        return handleErrors(error)
    }
}