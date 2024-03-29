import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, "Name is Required"],
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: [true, "User Already Exist"]
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
    },
    profilePhoto: {
        type: String,
        default: null
    },
    privacy: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },
    followers:{
        type: [Schema.Types.ObjectId],
        ref: "User"
    },
    following: {
        type: [Schema.Types.ObjectId],
        ref: "User"
    },
    pendingRequest : {
        type : [Schema.Types.ObjectId],
        ref: "User"
    }
},{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
}
);

export const User = mongoose.model("User", userSchema);
