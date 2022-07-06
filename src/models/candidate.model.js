import mongoose from "mongoose";
import { registerSchema } from "swaggiffy";
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
    votes: {
        type: Number,
        default: 0
    },
    organ: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organ'
    }
})

registerSchema('Candidate', candidateSchema, { orm: 'mongoose' });

export const Candidate = mongoose.model('Candidate', candidateSchema);