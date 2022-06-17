import { getAllPlaces, getPlace, newPlace, updatePlace, deletePlace, getPlaceByUser } from '../controllers/place.controller.js';
import { loginRequired } from '../controllers/users.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
const placeRoutes = (app) => {
    app.route('/places')
        .get(getAllPlaces)
        .post(newPlace)
    app.route('/places/:pid')
        .put(verifyToken, loginRequired, updatePlace)
        .delete(verifyToken, loginRequired, deletePlace)
        .get(getPlace)
    app.route('/user/places')
        .get(getPlaceByUser)
    // Get candidate by organisation
}
export default placeRoutes;