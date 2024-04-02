import { Follower } from "../models/followerSchema.js";
import { handleErrors } from "../utils/errorHandler.js";
import { findUserById } from "../utils/findUser.js"


export const checkUserFromFollowerSchema = async (loggedinUserId, userId) => {
    try {
        const loggedInUser = await findUserById(loggedinUserId);
        const user = await findUserById(userId);

        const userData = {
            id: userId,
            name: user.userName,
            email: user.email,
            profilePhoto: user.profilePhoto
        }

        if(!user.privacy) { 
            return{
                isData: true,
                user: userData
            }
    
        }
        if(user.privacy) {
            const isFollowing = await Follower.findById({userId: loggedinUserId, following: userId});
            if(isFollowing) return {
                isData: true,
                user: userData
            }
            return {
                isData: false,
                message: "This Account is Private. Follow user to watch this user's profile"
            }
        }
    } catch (error) {
        return handleErrors(error)
    }
}