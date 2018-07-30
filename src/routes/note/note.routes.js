import NoteController from './../../controllers/note/note.controller';

export default class NoteRoutes {

    static routes(app) {
        app.post('/note', NoteController.createNote);
        app.get('/note', NoteController.findAllNote);
        app.get('/note/:noteId', NoteController.findOneNote)
        app.put('/note/:noteId', NoteController.updateNote);
        app.delete('/note/:noteId', NoteController.deleteNote);
    }
}