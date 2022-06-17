import mongoose from 'mongoose';
export const candidateSchema = new mongoose.Schema({
    fullname: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    canImg: {
        type: String,
        required: [true, 'Candidate Image is required']
    },
    candidate: {
        type: String,
        required: [true, 'Candidate name which points user is required']
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })