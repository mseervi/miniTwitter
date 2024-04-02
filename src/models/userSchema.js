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
        type: Boolean,
        default: false // Default value for privacy set to false (public)
    },
    otp: {
        type: Number
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});

export const User = mongoose.model("User", userSchema);
