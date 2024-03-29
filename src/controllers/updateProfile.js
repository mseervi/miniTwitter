import { getProfilePhotoURI } from "../cloudinary/upload.js";
import { getUserAndUpdateProfile } from "../repo/updateProfile.repo.js";
import { handleErrors } from "../utils/errorHandler.js";

export const updateProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updateData =req.body;
        const profilePhoto = req.file;

        if(!profilePhoto && Object.keys(updateData).length === 0) return res.status(204).header({
            Message: "Nothing To Update!"
        }).end();

        const profilePhotoURI = profilePhoto ? await getProfilePhotoURI(profilePhoto.path) : null;

        const updatedUser = await getUserAndUpdateProfile(userId, updateData, profilePhotoURI);
        return res.send(updatedUser)
    } catch (error) {
        return res.status(422).send(handleErrors(error))
    }
}