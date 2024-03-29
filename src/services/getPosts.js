import { getPostByPostId, getPostsByUserId } from "../repo/getPost.repo.js";
import { handleErrors } from "../utils/errorHandler.js";

//get posts by userId
export const getPosts = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        const posts = await getPostsByUserId(userId)
        if(!posts.isData) return res.status(404).send(posts);
        
        return res.send(posts);
    } catch (error) {
        return res.status(500).send(handleErrors(error))
    }
}

//get post by postId
export const getPost = async(req, res) => {
    try {
        const postId = req.params.postId;

        const post = await getPostByPostId(postId);
        return res.send(post)
    } catch (error) {
        return res.status(500).send(handleErrors(error))
    }
}