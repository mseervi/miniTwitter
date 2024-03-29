import { Post } from "../models/postSchema.js"
import { handleErrors } from "../utils/errorHandler.js";
import { findUserById } from "../utils/findUser.js";

//create post
export const createPost = async ( _id, post) => {
    try {

        await findUserById(_id);

        const newPost = {
            userId: _id,
            content: post.content
        }
        const uploadData = await Post.create(newPost);

        return {
            isData: true,
            message: "Post Uploaded Successfully",
            data: uploadData
        }
    } catch (error) {
        return handleErrors(error);
    }
}

