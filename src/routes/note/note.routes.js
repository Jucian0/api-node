import { createNote, findAllNote, findOneNote, updateNote, deleteNote } from './../../controllers/note/note.controller';

export default function noteRoutes(app) {
    /** Create a new note */
    app.post('/notes', createNote);

    /** Retrieve all Notes */
    app.get('/notes', findAllNote);

    /** Retrieve a single Note with noteID */
    app.get('/notes/:noteId', findOneNote);

    /** Update a Note with noteId */
    app.put('/notes/:noteId', updateNote);

    /** Delete a Note with noteId */
    app.delete('/notes/:noteId', deleteNote);
}