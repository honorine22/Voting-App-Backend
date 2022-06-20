import mongoose from "mongoose";
import { UserSchema } from "../models/user.model.js";
const User = mongoose.model('User', UserSchema)

export const findByEmail = (req, res) => {
    User.findOne({ email: req.params.email })
        .then(user_email => {
            if (!user_email)
                return res.status(404).send({
                    message: "User with email" + req.params.email + " Not found"
                })
            res.send(user_email)
        })
        .catch(err => {
            return res.status(500).send({
                message: "Couldn't fetch user"
            })
        })
}

export const getUsers = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

export const getUser = async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId)
            .populate('organs')
        res.status(200).send(user.organs);
        console.log("Found the organisations");
    } catch (error) {
        error.status = 400;
        next(error)
    }
};

export const updateUser = (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    User.findByIdAndUpdate(req.params.uid, {
        username: req.body.username,
        email: req.body.email,
        // name: req.body.name,
        password: req.body.password,
        profileImg: url + '/public/' + req.file.filename

    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.uid
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.uid
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.uid
            });
        });
};

export const deleteUser = (req, res) => {
    const userId = req.user._id;
    console.log("decoded: " + userId)
    User.findByIdAndRemove(req.params.uid)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.uid
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.uid
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.uid
            });
        });
};