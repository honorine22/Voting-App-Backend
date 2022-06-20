import { Candidate } from "../models/candidate.model";
import { Organ } from "../models/organ.model";

export const newCandidate = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    try {
        const organId = req.params.oid;
        console.log("Checking Auth..." + organId);
        const organ = await Organ.findById(organId)

        const { fullname, description } = req.body;
        const createdOrgan = await Candidate.create({
            description,
            fullname,
            canImg: url + '/public/' + req.file.filename
        })
        organ.candidates.push(createdOrgan._id);
        await user.save();
        res.status(201).send({ ...createdOrgan._doc, organ: organ._id })
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