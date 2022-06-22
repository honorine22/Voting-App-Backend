import { Candidate } from "../models/candidate.model.js";
import { Image } from "../models/Image.model.js";
import { Organ } from "../models/organ.model.js";

export const newCandidate = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    try {
        const organId = req.params.oid;
        console.log("Checking Auth..." + organId);
        const organ = await Organ.findById(organId)
        const createdImage = new Image({
            image: url + '/public/' + req.file.filename
        });

        if (organ)
            console.log("Id found....");
        const { fullname, description } = req.body;


        const createdCandidate = await Candidate.create({
            organ,
            fullname,
            description,
            canImg: createdImage._id
        })

        await createdImage.save();
        await createdCandidate.save().then(can => {
            Organ.findOneAndUpdate({ _id: organId }, { $push: { candidates: can._id } })
                .then(() => {
                    res.status(201).send({ created: true, organId: organId, candidateId: createdCandidate._id });
                })
        })
    } catch (error) {
        error.status = 400
        next(error)
    }
}

export const AllCandidates = (req, res) => {
    Candidate.find()
        .then(candidates => {
            res.send(candidates);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving candidates."
            });
        });
};

export const vote = async (req, res) => {
    const candidate = await Candidate.findOne({ _id: req.params.id });
    if (!candidate) return res.status(404).json({ success: false, message: "Candidate doesn't exist" });
    candidate.votes += 1;
    await candidate.save();
    return res.status(200).json({ success: true, data: candidate, message: 'Successfully voted' });
}