import { getAllPlaces, getPlace, newPlace, updatePlace, deletePlace, getPlaceByUser } from '../controllers/place.controller.js';
import auth from '../middlewares/auth.middleware.js';
const placeRoutes = (app) => {
    app.route('/places')
        .get(getAllPlaces)
        .post(newPlace)
    app.route('/places/:pid')
        .put(auth, updatePlace)
        .delete(auth, deletePlace)
        .get(getPlace)
    app.route('/user/places')
        .get(getPlaceByUser)
    // Get candidate by organisation
}
export default placeRoutes;