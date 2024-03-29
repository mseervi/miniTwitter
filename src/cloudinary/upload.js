import cloudinary from '../config/cloudinaryConfig.js';
import { handleErrors } from '../utils/errorHandler.js';

export const getProfilePhotoURI = async (imagePath) => {

    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true
    };

    try {
        const result = await cloudinary.uploader.upload(imagePath, options);
        // const publicId = result.public_id
        // console.log(publicId)

        return result.url;
    } catch (error) {
        return handleErrors(error);
    }
}
