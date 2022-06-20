import { newOrgan, deleteOrgan, checkVoteNum, updateOrgan, myPolls, getAllOrganNames } from '../controllers/organ.controller.js';
import upload from '../middlewares/image.middleware.js';
import auth from '../middlewares/auth.middleware.js';
const organRoutes = (app) => {
    app.route('/organs')
        // .get(getAllOrgans)
        .post(auth, newOrgan)
    app.route('/organnames')
        .get(getAllOrganNames)
    app.route('/vote/:_id')
        .post(auth, checkVoteNum)
    // user || user organ:_id
    app.route('/organs/authuser')
        .get(auth, myPolls)
    app.route('/organs/:_id')
        .delete(auth, deleteOrgan)
        .put(auth,upload.single('organImg'), updateOrgan)
    // Get candidate by organisation
}
export default organRoutes;