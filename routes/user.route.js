import { getUser, getUsers, updateUser, deleteUser, findByEmail } from '../controllers/users.controller.js';
import { signin, signup } from '../controllers/auth.controller.js';
import auth from '../middlewares/auth.middleware.js'
import multer from 'multer';
import { v4 as uuid4 } from 'uuid';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid4() + '-' + filename)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
        }
    }
})

const usersRoutes = (app) => {
    app.route('/users')
        .get(getUsers);
    app.route('/users/:uid')
        .put(auth, upload.single('profileImg'), updateUser)
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