import { handleErrors } from "../utils/errorHandler.js";
import { findUserById } from "../utils/findUser.js"


export const checkPrivacyAndGetUser = async (userId) => {
    try {
        const user = await findUserById(userId);

        if(user.privacy) return {
            isData: false,
            message: "This User is Private, Follow user to visit this user's Profile"
        }

        const sendUserData = {
            id: userId,
            name: user.userName,
            email: user.email,
            profilePhoto: user.profilePhoto,
        }
        return {
            isData: true, 
            data: sendUserData
        }
    } catch (error) {
        return handleErrors(error)
    }
    
}