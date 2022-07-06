import express from 'express';
import { registerDefinition } from 'swaggiffy';
import { getImages, getOrganImages } from "../controllers/image.contoller.js";
const imageRoutes = express.Router({
    mergeParams: true
});
imageRoutes.route("/").get(getImages);
imageRoutes.route("/organImages").get(getOrganImages);
registerDefinition(imageRoutes, { tags: 'Images', basePath: "/images", mappedSchema: 'Image' })
export default imageRoutes;