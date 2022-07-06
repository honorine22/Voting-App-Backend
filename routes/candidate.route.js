import express from 'express';
import upload from '../middlewares/image.middleware.js';
import auth from '../middlewares/auth.middleware.js';
import { AllCandidates, deleteCandidate, getCandidate, getCandidatesByOrgan, newCandidate, updateCandidate, vote } from '../controllers/candidate.controller.js';
const candidateRoutes = express.Router({
    mergeParams: true
});
candidateRoutes.route("/:oid").get(getCandidatesByOrgan);
candidateRoutes.route("/:oid").get(AllCandidates);
candidateRoutes.route("/:oid").post(auth, upload.single('canImg'), newCandidate);

candidateRoutes.route("/vote/:oid/:cid").post(auth, vote);
candidateRoutes.route("/:oid/:cid").get(getCandidate);
candidateRoutes.route("/:oid/:cid").put(updateCandidate);
candidateRoutes.route("/:oid/:cid").delete(auth, deleteCandidate);

export default candidateRoutes;