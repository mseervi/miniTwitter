import { handleErrors } from "../utils/errorHandler.js";
import { findUserById } from "../utils/findUser.js";


export const addUserToFollowing = async(loggedInUserId, followingId) => {
    try {
        const loggedInUser = await findUserById(loggedInUserId);
        const followingUser = await findUserById(followingId);
    
        if(loggedInUser.following.includes(followingId)) return {
            isData: false,
            message: "You Are Already following this User!"
        }

        if(followingUser.pendingRequest.includes(loggedInUserId)) return {
            isData: false,
            message: "Already Requested!"
        }
    
        if(followingUser.privacy !== 'private') {
            loggedInUser.following.push(followingId);
            followingUser.followers.push(loggedInUserId)
    
            await followingUser.save();
            await loggedInUser.save();
    
            return {
                isData: true,
                message: `Now you (${loggedInUser.userName}) are following ${followingUser.userName}`,
                }
        } else {
            if (!followingUser.pendingRequest.includes(loggedInUserId)) {
                followingUser.pendingRequest.push(loggedInUserId);
                await followingUser.save();
            }
            return {
                isData: true,
                message: "This Account is Private, Request Sent successfully!"
            }
        }
    } catch (error) {
        return handleErrors(error);
    }
}   
