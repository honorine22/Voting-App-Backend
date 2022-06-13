import { getUser, getUsers, updateUser, deleteUser, signup, signin } from '../controllers/users.controller.js';

const usersRoutes = (app) => {
    app.route('/users')
        .post(signup)
        .get(getUsers);
    app.route('/users/:uid')
        .get(getUser)
        .put(updateUser)
        .delete(deleteUser);
    app.route('/login')
        .post(signin);

}
export default usersRoutes;