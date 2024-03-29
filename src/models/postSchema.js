import mongoose from "mongoose";
import { User } from "./userSchema.js";

const {Schema} = mongoose;

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},{
    timestamps : {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});

export const Post = mongoose.model("Post", postSchema)