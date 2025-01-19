import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        mobileNumber: {
            type: Number,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: true,
            minlength: 6
        },
        profilePic: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

export default User