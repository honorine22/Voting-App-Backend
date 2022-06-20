import upload from '../middlewares/image.middleware.js';
import auth from '../middlewares/auth.middleware.js';
import { newCandidate } from '../controllers/candidate.controller.js';
const organRoutes = (app) => {
    app.route('/candidate/:oid')
        .post(auth, upload.single('canImg'), newCandidate)
}
export default organRoutes;