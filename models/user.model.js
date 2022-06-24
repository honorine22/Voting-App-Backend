import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
    organs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organ'
    }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, collection: 'users' });

export const User = mongoose.model('User', UserSchema);