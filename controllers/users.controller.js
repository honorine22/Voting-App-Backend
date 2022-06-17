import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import multer from "multer";
impor

const User = mongoose.model('User', UserSchema)
// Create and Save a new Note

const DIR = '../public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uui)
    }
});

let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
        }
    }
})

export const signup = async (req, res, next) => {
    const { name, gender, email, password } = req.body;
    const url = req.protocol + '://' + req.get('host');
    User.find({ email }).exec().then(users => {
        if (users.length >= 1) {
            return res.status(409).send({
                message: 'Email already taken'
            })
        } else {
            bcrypt.hash(password, 10, (err, hashPassword) => {
                if (err) {
                    return res.status(500).send({
                        message: err
                    })
                } else {
                    // Create a User
                    const user = new User({
                        name,
                        gender,
                        email,
                        password: hashPassword,
                        profileImg: url + '/public' + req.file.filename
                    });

                    // Save User in the database
                    user.save()
                        .then(data => {
                            res.status(201).send(data);
                        }).catch(err => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating the User."
                            });

                        });
                }
            })
        }
    })
};

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

export const signin = (req, res) => {
    const { email, password } = req.body;
    User.find({ email })
        .exec()
        .then(users => {
            if (users.length < 1) {
                return res.status(404).send({
                    message: 'User not found'
                })
            }
            bcrypt.compare(password, users[0].password, (err, isEqual) => {
                console.log(password);
                console.log(users[0].password);
                if (err) {
                    return res.status(401).send({
                        message: 'Unauthorized'
                    })
                }
                if (isEqual) {
                    const token = jwt.sign({
                        email: users[0].email,
                        uid: users[0]._id
                    }, process.env.API_SECRET, {
                        expiresIn: '1h'
                    }, (err, token) => {
                        console.log(token);
                    });
                    return res.status(200).send({
                        message: 'Login Successfull',
                        token: token
                    })
                }
                res.status(401).send({
                    message: 'Unauthorized'
                })
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err
            })
        })
}

export const loginRequired = (req, res, next) => {
    if (req.user)
        next()
    else
        return res.status(401).send({
            message: 'Unauthorized user!!'
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