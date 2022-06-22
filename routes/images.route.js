import { getImages } from "../controllers/image.contoller.js";

const imageRoutes = (app) => {
    app.route('/images')
        .get(getImages)

}
export default imageRoutes;