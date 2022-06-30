import { getImages, getOrganImages } from "../controllers/image.contoller.js";

const imageRoutes = (app) => {
    app.route('/images')
        .get(getImages)

    app.route('/organImages')
        .get(getOrganImages)
}
export default imageRoutes;