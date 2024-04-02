import {  uploadPost } from "../repo/createPost.repo.js";
import { handleErrors } from "../utils/errorHandler.js";

export const createPost = async(req, res) => {
    try {
        const userId = req.userId;
        const content = req.body;
        if(!content) return res.status(204).header({
            isData: false,
            Message: "No Content to upload"
        }).end();

        const response = await uploadPost(userId, content);
        res.send(response)
    } catch (error) {
        return res.status(500).send(handleErrors(error))
    }
}