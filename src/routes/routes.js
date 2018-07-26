import noteRoutes from './note/note.routes';
import userRoutes from './user/user.routes';

export default function mainRoutes (app) {

    noteRoutes(app);

    userRoutes(app);
}



