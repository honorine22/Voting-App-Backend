import { getAllPlaces, getPlace, newPlace, updatePlace, deletePlace, getPlaceByUser } from '../controllers/place.controller.js';
const placeRoutes = (app) => {
    app.route('/places')
        .post(newPlace)
        .get(getAllPlaces)
    app.route('/places/:pid')
        .put(updatePlace)
        .delete(deletePlace)
        .get(getPlace)
    app.route('/user/:uid')
        .get(getPlaceByUser)
}
export default placeRoutes;