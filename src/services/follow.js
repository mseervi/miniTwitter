import { addUserToFollowing } from "../repo/addFollowing.js";
import { handleErrors } from "../utils/errorHandler.js";


export const followById = async(req, res) => {
    try {
        const followId = req.params.followId;
        const loggedInUserId = req.userId;

        if(followId === loggedInUserId) return res.status(400).send({
            isData: false,
            Message: "You can't Follow YourSelf!"
        });
        
        const response = await addUserToFollowing(loggedInUserId, followId);
        return res.send(response)
        
    } catch (error) {
        return res.status(500).send(handleErrors(error))
    }
}