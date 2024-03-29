import mongoose from "mongoose";
import { User } from "./userSchema";

const {Schema} = mongoose;

const pendingRequestSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true,
        unique: true
    },
    requestedUserId: {
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
});

export const PendingRequest = mongoose.model("PendingRequest", pendingRequestSchema)
