import { findUserById } from "../utils/findUser.js";
import { handleErrors } from "../utils/errorHandler.js";
import { Follower } from "../models/followerSchema.js";

export const acceptPendingRequest = async (loggedInUserId, pendingUserId) => {
    
    try {
        const loggedInUser = await findUserById(loggedInUserId);
        const pendingUser = await findUserById(pendingUserId);

        const isPendingUser = await Follower.findOne({userId: loggedInUserId, pendingFollowRequest: pendingUserId})
        if(!isPendingUser) return {
            isData: false,
            message: "No pending request found from this user!"
        }
        //after accept request, pendingUser will be now follower
        const newFollowerForLoggedInUser = {
            userId: loggedInUserId,
            follower: pendingUserId
        }
        await Follower.create(newFollowerForLoggedInUser);
        //pendingUser now removed from pending list
        await Follower.findOneAndDelete({userId: loggedInUserId, pendingFollowRequest: pendingUserId})

        //and pendingUser started following loggedInUser
        const newFollowingForPendingUser = {
            userId: pendingUserId,
            following: loggedInUserId
        }
        await Follower.create(newFollowingForPendingUser);

        return {
            isData: true,
            message: `You (${loggedInUser.userName}) accepted the follow Request of ${pendingUser.userName}`,
        };
    } catch (error) {
        return handleErrors(error)
    }
}