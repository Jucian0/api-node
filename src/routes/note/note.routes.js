import { createNote, findAllNote, findOneNote, updateNote, deleteNote } from './../../controllers/note/note.controller';

export default function noteRoutes(app) {
    /** Create a new note */
    app.post('/note', createNote);

    /** Retrieve all Notes */
    app.get('/note', findAllNote);

    /** Retrieve a single Note with noteID */
    app.get('/note/:noteId', findOneNote);

    /** Update a Note with noteId */
    app.put('/note/:noteId', updateNote);

    /** Delete a Note with noteId */
    app.delete('/note/:noteId', deleteNote);
}