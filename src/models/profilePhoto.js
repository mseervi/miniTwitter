import mongoose from "mongoose";
import { User } from "./userSchema.js";

const {Schema} = mongoose;

const profilePhotoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    profilePhotoURI : {
        type: String,
        unique: true
    },
    caption: {
        type: String
    },
    tags: {
        type :[String]
    }
},{
    timestamps: {
        createdAt:"createdAt",
        updatedAt:"updatedAt"
    }
})

export const ProfilePhoto =  mongoose.model("ProfilePhoto", profilePhotoSchema);