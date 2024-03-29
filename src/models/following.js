import mongoose from "mongoose";
import { User } from "./userSchema.js";

const {Schema} = mongoose;

export const followingSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true,
        unique: true
    },
    followingId: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true,
        unique: true
    }
},{
    timestamps :{
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
})