import { getAllOrgans, getOrgansByUser, newOrgan, deleteOrgan, checkVoteNum } from '../controllers/organ.controller.js';
import auth from '../middlewares/auth.middleware.js';
const organRoutes = (app) => {
    app.route('/organs')
        .get(getAllOrgans)
        .post(auth, newOrgan)
    app.route('/vote/:_id')
        .post(auth, checkVoteNum)
    // user || user organ:_id
    app.route('/organs/:_id')
        .delete(auth, deleteOrgan)
    app.route('/user/organ')
        .get(auth, getOrgansByUser)
    // Get candidate by organisation
}
export default organRoutes;