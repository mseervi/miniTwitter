import { getAllUsrsFromMiniTwitter } from "../repo/user.repo.js";
import { handleErrors } from "../utils/errorHandler.js";


export const allUsers = async (req, res) => {
    try {
        const users = await getAllUsrsFromMiniTwitter();
        res.send(users)
    } catch (error) {
        return handleErrors(error)
    }
    
}