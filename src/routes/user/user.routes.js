import UserController from './../../controllers/user/user.controller';
import verifyToken from './../../controllers/auth/verify-token';

export default class UseRoutes {

        static routes(app) {
                app.post('/user', UserController.createUser);
                app.get('/user', verifyToken, UserController.findAllUsers);
                app.get('/user/:userId', UserController.findOneUser);
                app.put('/user/:userId', UserController.updateUser);
                app.delete('/user/:userId', UserController.deleteUser);
        }
} 