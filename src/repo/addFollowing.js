import { Follower } from "../models/followerSchema.js";
import { handleErrors } from "../utils/errorHandler.js";
import { findUserById } from "../utils/findUser.js";


export const addUserToFollowing = async(loggedInUserId, followingId) => {
    try {
        const loggedInUser = await findUserById(loggedInUserId);
        const followingUser = await findUserById(followingId);
    

        const isAlreadyFollowing = await Follower.findOne({userId: loggedInUserId, following: followingId});
        if(isAlreadyFollowing) return {
            isData: false,
            message: "You Are Already following this User!"
        }

        const isRequestSent = await Follower.findOne({userId: followingId, pendingFollowRequest: loggedInUserId})
        if(isRequestSent) return {
            isData: false,
            message: "Already Requested!"
        }
    
        if(!followingUser.privacy) {
            
            //new following for loggedInUser
            const newFollowingForLoggedInUser = {
                userId: loggedInUserId,
                following: followingId
            }
            await Follower.create(newFollowingForLoggedInUser)

            //new follower for following user
            const newFollowerForFollowingUser = {
                userId: followingId,
                follower: loggedInUserId
            }
            await Follower.create(newFollowerForFollowingUser)

            return {
                isData: true,
                message: `Now you (${loggedInUser.userName}) are following ${followingUser.userName}`,
                }
        } else {
            if (followingUser.privacy && !isRequestSent ) {
                
                //new pending request for following user
                 const newPendingRequest = {
                    userId: followingId,
                    pendingFollowRequest: loggedInUserId
                }
                await Follower.create(newPendingRequest);
                return {
                    isData: true,
                    message: "This Account is Private, Request Sent successfully!"
                }
            }
        }
    } catch (error) {
        return handleErrors(error);
    }
}   
