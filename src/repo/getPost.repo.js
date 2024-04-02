import { Follower } from "../models/followerSchema.js";
import { Post } from "../models/postSchema.js";
import { handleErrors } from "../utils/errorHandler.js";
import { findUserById } from "../utils/findUser.js";

//get Post by userId
export const getPostsByUserId = async (loggedInUserId, userId) => {
    try {
        const user = await findUserById(userId);
        const loggedInUser = await findUserById(loggedInUserId);
        
        let posts;
        if (!user.privacy || userId === loggedInUserId) {
            posts = await Post.find({ userId: userId });
        } else {
            const isFollowing = await Follower.findOne({ userId: loggedInUserId, Following: userId });
            if (!isFollowing) {
                return {
                    isData: false,
                    message: "Follow this user to see their posts"
                };
            }
            posts = await Post.find({ userId: userId });
        }

        if (!posts.length) {
            return {
                isData: false,
                message: "No posts found!"
            };
        }

        return {
            isData: true,
            data: posts
        };
    } catch (error) {
        return handleErrors(error);
    }
};


//get post by postId
export const getPostByPostId = async (postid) => {
    try {
        const post = await Post.findById(postid);
        const userIdOfPost = post.userId;

        const user = await findUserById(userIdOfPost);
        if(user.privacy) {
            return {
                isData: false,
                message: "This post is posted by private User. Follow user to get thier posts"
            }
        }

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