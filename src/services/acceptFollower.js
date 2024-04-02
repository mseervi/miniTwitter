import { acceptPendingRequest } from "../repo/acceptPendingReq.js";
import { handleErrors } from "../utils/errorHandler.js";


export const acceptFollowerById = async (req, res) => {
    try {
        const loggedInUserId =  req.userId;
        const followerId = req.params.followReqId;

        if(loggedInUserId === followerId) return res.status(400).send({
            isData: false,
            message: "You can not follow yourself"
        })
    
        const response = await acceptPendingRequest(loggedInUserId, followerId);
    
        return res.send(response);
    } catch (error) {
        return res.status(500).send(handleErrors(error))
    }

}