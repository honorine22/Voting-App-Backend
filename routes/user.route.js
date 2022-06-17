import { getUser, getUsers, updateUser, deleteUser, signup, signin, findByEmail, loginRequired } from '../controllers/users.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const usersRoutes = (app) => {
    app.route('/users')
        .get(upload.single('profileImg'), getUsers);
    app.route('/users/:uid')
        .get(getUser)
        .put(verifyToken, loginRequired, updateUser)
        .delete(verifyToken, loginRequired, deleteUser);
    app.route('/users/email/:email')
        .get(findByEmail)
    app.route('/login')
        .post(signin);
    app.route('/register')
        .post(signup);

}
export default usersRoutes;