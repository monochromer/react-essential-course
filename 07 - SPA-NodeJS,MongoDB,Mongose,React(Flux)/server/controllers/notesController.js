import * as notesService from '../services/notesService';

class Controller {
    constructor(app) {
        notesService.setUpConnection();
        this.configureRoutes(app);
    }

    configureRoutes(app) {
        app.get('/notes', this.getNotes);
        app.post('/notes', this.postNote);
        app.delete('/notes/:id', this.deleteNote);
    }

    getNotes(req, res) {
        return notesService
          .listNotes()
          .then(data => res.send(data));
    }

    postNote(req, res) {
        return notesService
          .createNote(req.body)
          .then(data => res.send(data));
    }

    deleteNote(req, res) {
        return notesService
            .deleteNote(req.params.id)
            .then(data => res.send(data));
    }
}

export default Controller;
