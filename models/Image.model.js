import mongoose from 'mongoose';
import { registerSchema } from 'swaggiffy';
export const ImageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, collection: 'images' })

registerSchema('Image', ImageSchema, { orm: 'mongoose' });

export const Image = mongoose.model('Image', ImageSchema);