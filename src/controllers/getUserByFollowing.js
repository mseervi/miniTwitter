import { checkUserFromFollowerSchema } from "../repo/GetUserIfFollowing.js";
import { handleErrors } from "../utils/errorHandler.js";


export const checkFollowingGetUser =async (req, res) => {
    try {
        const loggedinUserId = req.userId;
        const userId = req.params.userId;

        if(loggedinUserId === userId) return {
            isData: false,
            message: "This is your Own Id. Enter Id for different user "
        }
        const user = await checkUserFromFollowerSchema(loggedinUserId, userId)
        res.send(user)

    } catch (error) {
        return handleErrors(error)
    }

}