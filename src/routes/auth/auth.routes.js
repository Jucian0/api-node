import { register, me, login } from './../../controllers/auth/auth.controller';
import { verifyToken } from './../../controllers/auth/verify-token';

export default function authRoutes(app) {

    /** Register a new user */
    app.post('/auth/register', register);

    /** return token with a headers */
    app.get('/auth/me', verifyToken, me);

    /** login user */
    app.post('/auth/login', login);
}