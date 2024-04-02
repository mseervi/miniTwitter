import { getUserById } from "../repo/user.repo.js";
import { handleErrors } from "../utils/errorHandler.js";

export const getUser = async(req, res) => {
    try {
        const userId = req.userId  || req.params.userId;
        
        const user = await getUserById(userId);

        return res.send(user)
    } catch (error) {
        return res.status(500).send(handleErrors(error))
    }

}