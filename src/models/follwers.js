import mongoose from "mongoose";
import { User } from "./userSchema.js";

const {Schema} = mongoose;

const followersSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true,
        unique: true
    },
    followerId: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true,
        unique: true
    }
},{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});

export const Follower = mongoose.model("Follower", followersSchema)
