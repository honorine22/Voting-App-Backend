import upload from '../middlewares/image.middleware.js';
import auth from '../middlewares/auth.middleware.js';
import { AllCandidates, newCandidate, vote } from '../controllers/candidate.controller.js';
const candidateRoutes = (app) => {
    app.route('/candidates')
        .get(AllCandidates)
    app.route('/vote/:oid/:cid')
        .post(auth, vote)
    app.route('/candidate/:oid')
        .post(auth, upload.single('canImg'), newCandidate)
}
export default candidateRoutes;