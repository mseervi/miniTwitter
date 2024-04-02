import mongoose from "mongoose";
import { User } from "./userSchema.js";

const {Schema} = mongoose;

const followerSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    following: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    follower: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    pendingFollowRequest : {
        type: Schema.Types.ObjectId,
        ref: User
    }
},{
    timestamps :{
        createdAt:"createdAt",
        updatedAt:"updatedAt"
    }
})

export const Follower = mongoose.model("Follower", followerSchema)