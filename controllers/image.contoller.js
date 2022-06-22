import { User } from "../models/user.model.js";
import { Image } from '../models/Image.model.js';

export const uploadImage = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        const url = req.protocol + '://' + req.get('host');
        const createdImage = new Image({
            image: url + '/public/' + req.file.filename
        });
        await User.findByIdAndUpdate(userId, { profileImg: createdImage._id });
        await createdImage.save();
        res.status(200).json({ success: true, data: createdImage });
    } catch (error) {
        error.status = 400
        next(error)
    }
}

export const uploadOrganImage = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        const url = req.protocol + '://' + req.get('host');
        const createdImage = new Image({
            image: url + '/public/' + req.file.filename
        });
        await User.findByIdAndUpdate(userId, { profileImg: createdImage._id });
        await createdImage.save();
        res.status(200).json({ success: true, data: createdImage });
    } catch (error) {
        error.status = 400
        next(error)
    }
}

export const updateImage = async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    Image.findByIdAndUpdate(req.params.iid, {
        image: url + '/public/' + req.file.filename

    }, { new: true })
        .then(image => {
            if (!image) {
                return res.status(404).send({
                    message: "Image not found with id " + req.params.iid
                });
            }
            res.send(image);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Image not found with id " + req.params.iid
                });
            }
            return res.status(500).send({
                message: "Error updating image with id " + req.params.iid
            });
        });
}

export const getImages = async (req, res) => {
    Image.find().then((images) => {
        res.status(200).send({ message: "Images available", images })
    });
}