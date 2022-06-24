import { newOrgan, deleteOrgan, updateOrgan, getAllOrganNames, allOrgans } from '../controllers/organ.controller.js';
import upload from '../middlewares/image.middleware.js';
import auth from '../middlewares/auth.middleware.js';
const organRoutes = (app) => {
    app.route('/organs')
        .post(auth, upload.single('organImg'), newOrgan)
        .get(allOrgans)
    app.route('/organnames')
        .get(getAllOrganNames)
    app.route('/organs/:_id')
        .delete(auth, deleteOrgan)
        .put(auth, upload.single('organImg'), updateOrgan)
    // Get candidate by organisation
}
export default organRoutes;