import { getUser, getUsers, updateUser, deleteUser, findByEmail } from '../controllers/users.controller.js';
import { signin, signup } from '../controllers/auth.controller.js';
import auth from '../middlewares/auth.middleware.js'
import upload from '../middlewares/image.middleware.js';

const usersRoutes = (app) => {
    app.route('/users')
        .get(getUsers);
    app.route('/users/:uid')
        .put(upload.single('profileImg'), updateUser)
        .delete(auth, deleteUser);
    app.route('/users/email/:email')
        .get(findByEmail)
    app.route('/login')
        .post(signin);
    app.route('/register')
        .post(upload.single('profileImg'), signup);
    app.route('users')
        .get(getUser)

}
export default usersRoutes;