import NoteRoutes from './note/note.routes';
import UseRoutes from './user/user.routes';
import AuthRoutes from './auth/auth.routes';

export default function mainRoutes (app) {

    NoteRoutes.routes(app);

    UseRoutes.routes(app);

    AuthRoutes.routes(app);
}



