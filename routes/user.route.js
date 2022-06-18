import { getUser, getUsers, updateUser, deleteUser, findByEmail } from '../controllers/users.controller.js';
import { signin, signup } from '../controllers/auth.controller.js';
import auth from '../middlewares/auth.middleware.js'
const usersRoutes = (app) => {
    // upload.single('profileImg')
    app.route('/users')
        .get(getUsers);
    app.route('/users/:uid')
        .put(auth, updateUser)
        .delete(auth, deleteUser);
    app.route('/users/email/:email')
        .get(findByEmail)
    app.route('/login')
        .post(signin);
    app.route('/register')
        .post(signup);
    app.route('users')
        .get(getUser)

}
export default usersRoutes;