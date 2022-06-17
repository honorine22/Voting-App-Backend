import mongoose from 'mongoose';
import { OrganSchema } from '../models/organ.model.js';
import { UserSchema } from '../models/user.model.js';
const User = mongoose.model('User', UserSchema);
const Organ = mongoose.model('Organ', OrganSchema);

export const getAllOrgans = (req, res, next) => {
    try {
        const organs = await Organ.find()
            .populate('user', ['email', '_id'])
        res.status(201).send(organs)
        console.log("Organs fetched.");
    } catch (error) {
        if (error.code === 11000) {
            error.message = 'Sorry, that email is already taken.'
        }
        next(error)
    };
}

export const newOrgan = (req, res) => {
    try {
        console.log("Checking Auth..." + req.decoded);
        const { _id } = req.decoded
        const user = await User.findById(_id)
        const { orgname, candidates } = req.body
        const organ = await Organ.create({
            user,
            orgname,
            candidates: candidates.map(candidate => ({
                candidate,
                votes: 0
            }))
        })
        user.organs.push(organ._id);
        await user.save();
        res.status(201).send({ ...organ._doc, user: user._id })
    } catch (error) {
        error.status = 400
        next(error)
    }
}



// router.get(
//     '/user',
//     auth,
export const getOrgansByUser = async (req, res, next) => {
    try {
        const { _id } = req.decoded
        const user = await User.findById(_id)
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
    try {
        const { _id } = req.params
        const { _id: userID } = req.decoded
        const organ = await Organ.findById(_id);

        if (!organ) throw new Error("No organ found.");
        if (organ.user.toString() !== userID) {
            throw new Error('Unauthorized access.')
        }
        await organ.remove()
        res.status(202).json(organ)
        console.log("organ deleted.")

    } catch (error) {
        error.status = 400
        next(error)
    }
}

export const checkVoteNum = async (req, res, next) => {
    try {
        const { _id: organID } = req.params
        const { _id: userID } = req.decoded
        const { answer } = req.body

        if (answer) {
            const organ = await Organ.findById(organID)
            if (!organ) throw new Error("No answer given.")

            const vote = organ.candidates.map(can => {
                if (can.fullname === answer) {
                    return {
                        fullname: can.fullname,
                        description: can.description,
                        _id: can._id,
                        votes: can.votes + 1
                    }
                } else {
                    return can
                }
            })

            if (organ.voted.filter(user =>
                user.toString() === userID).length <= 0) {
                organ.voted.pushed(userID)
                console.log(`Voted by userID ${userID}.`);
                organ.candidates = vote;
                await organ.save()
                res.status(201).send(organ)
            }
            else throw new Error('Already voted.')
        } else {
            throw new Error('No vote provided.')
        }
    } catch (error) {
        error.status = 400
        next(error)
    }
}

export const allOrgans = (req, res) => {
    Organ.find()
        .then(organs => {
            return res.status(200).send(organs);
        })
        .catch(err => {
            return res.status(500).send({
                message: "Could n't retrieve places" + err.message
            })
        })
}