import NoteModel from './../models/note.model';

/** Create and return all notes from the database */
export function createNote(req, res, next) {
    if (!req.body.content) {
        return res.status(400).send({
            message: 'Note content can not be empty'
        });
    };

    const note = new NoteModel({
        title: req.body.title || 'Untitled Note',
        content: req.body.content || 'Sem Conteudo'
    });

    note.save()
        .then((note) => {
            res.status(200).send(note);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || 'Some error ocured while creating the Note.'
            });
        });
}

/** Retrivied and return all notes from the database */
export function findAllNote(req, res) {
    NoteModel.find()
        .then((notes) => {
            res.status(200).send(notes);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || 'Some error ocurred while retrieving notes.'
            });
        });
};

/** Find a single note with a noteId */
export function findOneNote(req, res) {
    NoteModel.findById(req.params.noteId)
        .then((note) => {
            if (!note) {
                return res.status(404).send({
                    message: `Note not found with id ${req.params.noteId}`
                });
            }
            res.status(200).send(note);
        })
        .catch((error) => {
            if (error.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Note not found with id ${req.params.noteId}`
                })
            }

            return res.status(500).send({
                message: `Error retrieving note with id ${req.params.noteId}`
            });
        });
};

/** Update a note identified by the noteId in the request */
export function updateNote(req, res) {
    if (!req.body.content) {
        return res.status(400).send({
            message: 'Note content can not be empty'
        });
    };

    NoteModel.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || 'Untitled Note',
        content: req.body.content
    }, { new: true })
        .then((note) => {
            if (!note) {
                return res.status(404).send({
                    message: `Note not found with id ${req.params.noteId}`
                });
            }
            res.status(200).send(note);
        })
        .catch((error) => {
            if (error.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Note not found with id ${req.params.noteId}`
                });
            }

            return res.status(500).send({
                message: `Note not found with id ${req.params.noteId}`
            });
        });
};

/** Delete a note with the specified noteId in the request */
export function deleteNote (req, res) {
    NoteModel.findByIdAndRemove(req.params.noteId)
        .then((note) => {
            if (!note) {
                return res.status(404).send({
                    message: `Note not found with id ${req.params.noteId}`
                });
            }
            res.status(200).send({
                message: 'Note deleted successfully.'
            });
        })
        .catch((error) => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                return res.status(404).send({
                    message: `Note not found with id ${req.params.noteId}`
                });
            }
            return res.status(500).send({
                message: `Could not delete note with id ${req.params.noteId}`
            })
        })
};