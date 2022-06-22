import mongoose from 'mongoose';
export const ImageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, collection: 'images' })

export const Image = mongoose.model('Image', ImageSchema);