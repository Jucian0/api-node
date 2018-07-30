import AuthController from './../../controllers/auth/auth.controller';
import verifyToken from './../../controllers/auth/verify-token';

export default class AuthRoutes {

    static routes(app) {
        app.post('/auth/register', AuthController.register)
        app.get('/auth/me', verifyToken, AuthController.me)
        app.post('/auth/login', AuthController.login)
    }
}
