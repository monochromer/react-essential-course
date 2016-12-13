import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import NotesController from './controllers/notesController';

import { serverPort } from '../etc/config.json';
// import * as notesService from './services/notesService';


class App {
    constructor() {
        this._express = express;
        this._app = express();

        // Using bodyParser middleware
        this._app.use(bodyParser.json());

        // Allow requests from any origin
        this._app.use(cors({ origin: '*' }));

        const ctrl = new NotesController(this._app);
    }

    run() {
        this._server = this._app.listen(serverPort, function() {
            console.log(`Server is up and running on port ${serverPort}`);
        });
    }
}


(new App()).run();
