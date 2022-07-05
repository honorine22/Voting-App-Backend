import upload from '../middlewares/image.middleware.js';
import auth from '../middlewares/auth.middleware.js';
import { AllCandidates, deleteCandidate, getCandidate, getCandidatesByOrgan, newCandidate, updateCandidate, vote } from '../controllers/candidate.controller.js';
const candidateRoutes = (app) => {
    app.route('/candidates/:oid')
        .get(getCandidatesByOrgan)
        .post(auth, upload.single('canImg'), newCandidate)
        .get(AllCandidates)
    app.route('/candidates/vote/:oid/:cid')
        .post(auth, vote)
    app.route('/candidates/:oid/:cid')
        .get(getCandidate)
        .post(updateCandidate)
        .delete(auth, deleteCandidate)
}
export default candidateRoutes;