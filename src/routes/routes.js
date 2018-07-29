import noteRoutes from './note/note.routes';
import userRoutes from './user/user.routes';
import authRoutes from './auth/auth.routes';

export default function mainRoutes (app) {

    noteRoutes(app);

    userRoutes(app);

    authRoutes(app);
}



