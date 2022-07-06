import mongoose from 'mongoose';
import { registerSchema } from 'swaggiffy';

const OrganSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orgname: {
        required: true,
        type: String
    },
    organImg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    }],
    voted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, collection: 'organs' })

registerSchema('Organ', OrganSchema, { orm: 'mongoose' });

export const Organ = mongoose.model('Organ', OrganSchema);