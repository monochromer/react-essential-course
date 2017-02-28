import express from 'express';

import * as notesService from '../services/notesService';

class Controller {
    constructor(app) {
        notesService.setUpConnection();
        this.router = express.Router();
        this.configureRoutes(this.router);
        return this.router;
    }

    configureRoutes(router) {
        router.get('/notes', this.getNotes);
        router.post('/notes', this.postNote);
        router.delete('/notes/:id', this.deleteNote);
    }

    getNotes(req, res) {
        return notesService.listNotes()
          .then(data => res.send(data));
    }

    postNote(req, res) {
        return notesService.createNote(req.body)
          .then(data => res.send(data));
    }

    deleteNote(req, res) {
        return notesService.deleteNote(req.params.id)
            .then(data => res.send(data));
    }
}

export default Controller;
