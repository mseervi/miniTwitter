import { User } from "../models/userSchema.js";
import { handleErrors } from "../utils/errorHandler.js";
import { findUserById } from "../utils/findUser.js";

export const getUserAndUpdateProfile = async(_id, updateDetails, profilePhotoURI) =>  {
    try {
        const user = await findUserById(_id);
        
        if(updateDetails.userName) user.userName = updateDetails.userName;
        if(updateDetails.privacy) user.privacy = updateDetails.privacy;
        if(profilePhotoURI) user.profilePhoto = profilePhotoURI;

        await user.save();
        return {
            message: `Profile Update Successfully!`,
            UpdatedUser : user
        }
    } catch (error) {
        return handleErrors(error);
    }
}