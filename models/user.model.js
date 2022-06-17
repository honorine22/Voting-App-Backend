import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name not provided']
    },
    gender: {
        type: String,
        enum: ['female', 'male', 'none'],
        default: 'none',
        required: [true, 'gender not provided']
    },
    email: {
        type: String,
        unique: [true, "email already exists in database"],
        required: [true, 'Email not provided'],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        required: [false, 'Profile Image is required']
    },
    // user can register as a candidate in different organisations (one or more)
    organs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organ'
    }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });