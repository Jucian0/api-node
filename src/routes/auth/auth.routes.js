import { register, me, login } from './../../controllers/auth/auth.controller';

export default function authRoutes(app) {

    /** Register a new user */
    app.post('/register', register);

    /** return token with a headers */
    app.get('/me', me);

    /** login user */
    app.post('/login', login);
}