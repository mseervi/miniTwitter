import express from "express";
import multer from "multer";

import { otpConfirmation, userRegister } from "../controllers/userSignup.js";
import { userLogin } from "../controllers/userLogin.js";
import { getUser } from "../controllers/user.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { updateProfile } from "../controllers/updateProfile.js";
import { createPost } from "../services/createPost.js";
import { getPost, getPosts } from "../services/getPosts.js";
import { followById } from "../services/follow.js";
import { acceptFollowerById } from "../services/acceptFollower.js";
import { allUsers } from "../controllers/allUsers.js";
import { checkAndGetUser } from "../controllers/getUserById.js";
import { checkFollowingGetUser } from "../controllers/getUserByFollowing.js";


const router = express.Router();
const upload = multer({dest: "uploads/"})

router.post("/register", userRegister);
router.post("/confirm-otp", otpConfirmation)

router.post("/login",userLogin );

//GET all users
router.get("/", allUsers )

//GET user
router.get("/user", verifyUser, getUser)

//GET user by Id
router.get("/:userId", checkAndGetUser)

//GET user : only if following
router.get("/user/:userId", verifyUser, checkFollowingGetUser)

//update user details and upload profile photo
router.put("/update-profile", verifyUser, upload.single("profilePhoto"), updateProfile);

//create a post
router.post ("/posts", verifyUser, createPost);

//get all posts

//get posts by user id
router.get("/:userId/posts", verifyUser, getPosts);

//get post by post id
router.get("/:postId/post/", getPost)

//get post of private account

//follow a user
router.post("/:followId/follow", verifyUser, followById);

//accept follow request
router.post("/:followReqId/accept-follower", verifyUser, acceptFollowerById)

export default router;
