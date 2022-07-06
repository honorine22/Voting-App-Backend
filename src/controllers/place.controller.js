import { Place } from '../models/place.model.js';
import { User } from '../models/user.model.js';
import { v4 as uuid4 } from 'uuid';
import HttpError from '../models/http-error.js';

export const getAllPlaces = (req, res) => {
    Place.find()
        .then(places => {
            return res.status(200).send(places);
        })
        .catch(err => {
            return res.status(500).send({
                message: "Could n't retrieve places" + err.message
            })
        })
}

export const getPlace = (req, res) => {
    Place.findById(req.params.pid)
        .then(place => {
            if (!place) {
                res.status(404).send({
                    message: "Could not find a place for the provided id."
                })
            }
            res.send(place);
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: req.params.pid + 'Not found'
                })
            }
            return res.status(500).send({
                message: "Couldn't get item"
            })
        })
}

// Simplified Form
export const getPlaceById = (req, res) => {
    const userId = req.params.uid;
    const user = User.find(u => {
        return u.uid === userId;
    });
    // res.json()
    res.send(user);
}

export const getPlaceByUser = (req, res, next) => {
    const { email } = req.body;
    let userEmail = "";
    User.findOne({ email })
        .then(() => {
            userEmail = email;
        });
    Place.find()
        .then(places => {
            const placesArr = places.filter(function (place) {
                return place.creator == userEmail;
            });
            res.send(placesArr)
        });
};

export const newPlace = (req, res) => {
    const { title, description, coordinates, address, creator } = req.body;
    if (!title) {
        return res.status(400).send({
            message: "Name can't be empty"
        })
    }
    const place = new Place({
        id: uuid4(),
        title, description,
        location: coordinates,
        address, creator
    })
    place.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            })
        })

}

export const updatePlace = (req, res) => {
    Place.findByIdAndUpdate(req.params.pid, {
        title, description
    }, { new: true })
        .then(place => {
            if (!place) {
                throw new HttpError("Could not find a place for the provided id.", 404);

            }
            res.send(place);
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: req.params.pid + 'Not found'
                })
            }
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            })
        })
}

export const deletePlace = (req, res) => {
    Place.findByIdAndRemove(req.params.pid)
        .then(place => {
            if (!place) {
                throw new HttpError("Could not find a place for the provided id.", 404);
            }
            res.send({ message: "Place with " + req.params.pid + " deleted" })
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.pid
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.pid
            });
        })
}
