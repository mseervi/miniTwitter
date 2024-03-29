import express from "express";
import multer from "multer";

import { userRegister } from "../controllers/userSignup.js";
import { userLogin } from "../controllers/userLogin.js";
import { getUser } from "../controllers/user.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { updateProfile } from "../controllers/updateProfile.js";
import { uploadPost } from "../services/uploadPost.js";
import { getPost, getPosts } from "../services/getPosts.js";
import { followById } from "../services/follow.js";
import { extractUserFromToken } from "../middlewares/extractUserFromToken.js";
import { acceptFollowerById } from "../services/acceptFollower.js";


const router = express.Router();
const upload = multer({dest: "uploads/"})

router.post("/register", userRegister);

router.post("/login",userLogin );

//get user by id
router.get("/:userId", verifyUser, getUser);
// GET '/api/users/userId' is now protected. = GET '/api/users/example' 

//update user details and upload profile photo
router.put("/:userId/update-profile", verifyUser, upload.single("profilePhoto"), updateProfile);

//create a post
router.post ("/:userId/posts", verifyUser, uploadPost);

//get posts by user id
router.get("/:userId/posts", verifyUser, getPosts)

//get post by post id
router.get("/:postId/post/", getPost)

//follow a user
router.post("/:followId/follow", extractUserFromToken, followById);

//accept follow request
router.post("/:followReqId/accept-follower", extractUserFromToken, acceptFollowerById)

router.get("/:userId/followers")

export default router;
