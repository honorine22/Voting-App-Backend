import mongoose from 'mongoose';
const PlaceSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    location: {
        required: true,
        type: Object
    },
    creator: {
        required: true,
        type: String
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

export const Place = mongoose.model('Place', PlaceSchema);