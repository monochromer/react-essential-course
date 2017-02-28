import path from 'path';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// import webpackMiddleware from 'webpack-dev-middleware';

import NotesController from './controllers/notesController';
import { serverPort } from '../etc/config.json';

class App {
    constructor() {
        this._express = express;
        this._app = express();
        
        this._app.use(express.static(path.join(__dirname + '/../public')));

        this._app.use(bodyParser.json());
        this._app.use(cors({ origin: '*' }));
        // this._app.use(app.use(webpackMiddleware()));

        this._app.use(new NotesController());
    }

    run() {
        this._server = this._app.listen(serverPort, function() {
            console.log(`Server is up and running on port ${serverPort}`);
        });
    }
}


(new App()).run();
