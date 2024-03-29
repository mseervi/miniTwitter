import { findUserById } from "../utils/findUser.js";
import { handleErrors } from "../utils/errorHandler.js";

export const addUserToFollwers = async (loggedInUserId, followerId) => {
    try {
        const loggedInUser = await findUserById(loggedInUserId);
        const follower = await findUserById(followerId);

        const indexOfFollower = loggedInUser.pendingRequest.indexOf(followerId);

        if(loggedInUser.pendingRequest.length === 0) return {
            isData: false,
            message: "No pending Request!"
        }
        if (indexOfFollower > -1) {
            loggedInUser.pendingRequest.splice(indexOfFollower, 1);

            if(!loggedInUser.followers.includes(followerId)){
                loggedInUser.followers.push(followerId);
                follower.following.push(loggedInUserId);

                await loggedInUser.save();
                await follower.save();
                return {
                    isData: true,
                    message: "Follow Request Accepted"
                };
            } return {
                isData: false,
                message: "Already Request Accepted"
            }

        }
        
        
    } catch (error) {
        return handleErrors(error);
    }
};
