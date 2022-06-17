import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
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
    votes: {
        type: Number,
        default: 0
    }
})


export const organSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orgname: {
        required: true,
        type: String
    },
    orgImg: {
        type: String,
        required: [true, 'Organisation Image is required']
    },
    candidates: [candidateSchema],
    voted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })