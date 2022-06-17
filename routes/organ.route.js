import { loginRequired } from '../controllers/users.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
import { getAllOrgans, getOrgansByUser, newOrgan, deleteOrgan, checkVoteNum } from '../controllers/organ.controller.js';
const placeRoutes = (app) => {
    app.route('/organs')
        .get(getAllOrgans)
        .post(verifyToken, loginRequired, newOrgan)
    app.route('/vote/:_id')
        .post(verifyToken, loginRequired, checkVoteNum)
    // user || user organ:_id
    app.route('/organs/:_id')
        .delete(verifyToken, loginRequired, deleteOrgan)
    app.route('/user/organ')
        .get(verifyToken, loginRequired, getOrgansByUser)
    // Get candidate by organisation
}
export default placeRoutes;