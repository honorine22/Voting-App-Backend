import mongoose from 'mongoose';
import { Image } from '../models/Image.model.js';
import { Organ } from '../models/organ.model.js';
import { User } from '../models/user.model.js';


export const allOrgans = async (req, res) => {
    Organ.find().then((organs) => {
        res.status(200).send({ organs: "Organs available", organs })
    });
}

export const getAllOrganNames = async (req, res, next) => {
    try {
        const organs = await Organ.find()
            .populate('user', ['email', '_id'])
        const arrayOrgans = organs.map(({ _id, orgname, organImg }) => ({
            _id,
            orgname,
            organImg,
            orgImage: Image.findById(organImg).then(img => img.image)
        }))
        const uniqueNames = [];

        // This method gets called with each element in the array.
        const uniqueOrgans = arrayOrgans.filter(element => {
            const isDuplicate = uniqueNames.includes(element.orgname);
            // For the first time orgname get into uniqueNames because we initially
            // have empty array which doesn't contain the same name. when another
            // orgname of the second item comes, it check if names are equal or not
            // and insert the item if it is different

            if (!isDuplicate) {
                uniqueNames.push(element.orgname, element.organImg);
                return true;
            }
            return false;
        })
        // Returned only organisation names
        res.status(201).send({
            orgsData: uniqueOrgans
            // orgImage: 
        })
    } catch (error) {
        if (error.code === 11000) {
            error.message = 'Sorry, that email is already taken.'
        }
        next(error)
    };
}

export const newOrgan = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    try {
        const userId = req.user._id;
        console.log("Checking Auth..." + userId);
        const user = await User.findById(userId)
        const { orgname } = req.body;
        const createdImage = new Image({
            image: url + '/public/' + req.file.filename
        });
        const organ = await Organ.create({
            user,
            orgname,
            organImg: createdImage._id
        })
        await createdImage.save();
        await organ.save().then(organ => {
            User.findOneAndUpdate({ _id: userId }, { $push: { organs: organ._id } }).then(() => {
                res.status(201).send({ created: true, userId: user._id, organId: organ._id });
            });

        });
    } catch (error) {
        error.status = 400
        next(error)
    }
}

export const updateOrgan = (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    Organ.findByIdAndUpdate(req.params._id, {
        orgname: req.body.orgname,
        candidates: req.body.candidates,
        organImg: url + '/public/' + req.file.filename
    }, { new: true })
        .then(organ => {
            if (!organ) {
                return res.status(404).send({
                    message: "Organ not found with id " + req.params._id
                });
            }
            res.send(organ);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Organ not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error updating Organ with id " + req.params._id
            });
        });
};

export const myPolls = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId)
            .populate('organs');
        res.status(200).json(user.organs)

    } catch (err) {
        return next({
            status: 400,
            message: err.message,
        });
    }
}



export const getOrganByUser = async (req, res, next) => {
    try {
        const { _id } = req.params
        console.log(_id)
        const organ = await Organ.findById(_id)
            .populate('user', ['email', '_id'])

        if (!organ) { throw new Error("No organ found.") }

        res.status(200).json(organ);
    } catch (error) {
        error.status = 400
        next(error)
    }
}

export const deleteOrgan = async (req, res, next) => {
    const userId = req.user._id;
    try {
        const { _id } = req.params
        const organ = await Organ.findById(_id);

        if (!organ) throw new Error("No organ found.");
        if (organ.user.toString() !== userId) {
            throw new Error('Unauthorized access.')
        }
        await organ.remove()
        res.status(202).send({ message: "Organ Deleted." })
        console.log("organ deleted.")

    } catch (error) {
        error.status = 400
        next(error)
    }
}