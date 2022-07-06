import express from 'express';
import { newOrgan, deleteOrgan, updateOrgan, getAllOrganNames, allOrgans, getOrganById } from '../controllers/organ.controller.js';
import upload from '../middlewares/image.middleware.js';
import auth from '../middlewares/auth.middleware.js';

const organRoutes = express.Router({
    mergeParams: true
});
organRoutes.route("/").get(allOrgans);
organRoutes.route("/organnames").get(getAllOrganNames);

organRoutes.route("/").post(auth, upload.single('organImg'), newOrgan);

organRoutes.route("/:oid").get(getOrganById);

organRoutes.route("/_id").delete(auth, deleteOrgan);
organRoutes.route("/_id").put(auth, upload.single('organImg'), updateOrgan);

export default organRoutes;