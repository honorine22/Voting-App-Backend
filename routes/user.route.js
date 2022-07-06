import express from 'express';
import { getUser, getUsers, updateUser, deleteUser, findByEmail } from '../controllers/users.controller.js';
import { signin, signup } from '../controllers/auth.controller.js';
import auth from '../middlewares/auth.middleware.js'
import upload from '../middlewares/image.middleware.js';
// import { registerDefinition } from 'swaggiffy';

const usersRoutes = express.Router({
    mergeParams: true
});
usersRoutes.route("/").get(getUsers);
usersRoutes.route("/:uid").put(upload.single('profileImg'), updateUser);

usersRoutes.route("/:uid").delete(auth, deleteUser);
usersRoutes.route("/:uid").get(getUser);

usersRoutes.route("/email/:email").get(findByEmail);


usersRoutes.route("/login").post(signin);
usersRoutes.route("/register").post(upload.single('profileImg'), signup);

// registerDefinition(usersRoutes, { tags: 'Users', mappedSchema: 'User' })
export default usersRoutes;