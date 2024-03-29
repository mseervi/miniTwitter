import { Post } from "../models/postSchema.js";
import { handleErrors } from "../utils/errorHandler.js";
import { findUserById } from "../utils/findUser.js";

//get Post by userId
export const getPostsByUserId = async (userId) => {
    try {
        await findUserById(userId);

        const posts = await Post.find({userId});
        if(!posts.length) return {
            isData: false,
            message: "No Post Found!"
        }
        return {
            isData: true,
            data: posts
        }
    } catch (error) {
        return handleErrors(error);
    }
}

//get post by postId
export const getPostByPostId = async (postid) => {
    try {
        const post = await Post.findById(postid);
        if(!post) return {
            isData: false,
            message: "No Post Found!"
        }

        return {
            isDat: true,
            data: post
        }
    } catch (error) {
        return handleErrors(error);
    }
}