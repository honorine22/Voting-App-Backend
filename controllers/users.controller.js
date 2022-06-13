import mongoose from "mongoose";
import { UserSchema } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";
const User = mongoose.model('User', UserSchema)
// Create and Save a new Note
export const signup = (req, res) => {

    const { name, gender, email, password } = req.body;
    // Validate request
    if (!name) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    }
    // Create a User
    const user = new User({
        name,
        gender,
        email,
        password
    });

    // Save User in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};

export const signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User Not Found"
                })
            }

            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401)
                    .send({ accessToken: null, message: "Invalid Password" })
            }
            const token = jsonwebtoken.sign({
                id: user.id
            }, process.env.API_SECRET, {
                expiresIn: 86400
            })
            res.status(200).send({
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name
                },
                message: "Login Successfull",
                accessToken: token
            });
        })
}



// Retrieve and return all notes from the database.
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

// Find a single note with a noteId
export const getUser = (req, res) => {
    User.findById(req.params.uid)
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
                message: "Error retrieving user with id " + req.params.uid
            });
        });
};

// Update a note identified by the noteId in the request
export const updateUser = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    }

    // Find note and update it with the request body
    User.findByIdAndUpdate(req.params.uid, {
        name: req.body.name,
        gender: req.body.gender,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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

// Delete a note with the specified noteId in the request
export const deleteUser = (req, res) => {
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