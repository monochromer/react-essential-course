import path from 'path';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import normalizePort from './utils/normalizePort';

import NotesController from './controllers/notesController';

import config from '../etc/config';

class App {
    constructor() {
        this._express = express;
        this._app = express();
        this.configure();
        this.mountRoutes();
    }

    configure() {
        var app = this._app;
        app.set('port', normalizePort(config.serverPort));
        app.use(express.static(path.join(__dirname + '/../public')));
        app.use(bodyParser.json());
        app.use(cors({ origin: '*' }));
    }

    mountRoutes() {
        var app = this._app;

        app.use('/api', new NotesController());

        app.use(function(req, res, next) {
            res.status(404)
                .send('not found');
        });

        app.use(function(err, req, res, next) {
            if (res.headersSent) {
                return next(err);
            }
            res.status(err.status || 500)
                .send('error', JSON.stringify(err, null, 2));
        });
    }

    run() {
        var app = this._app;
        this._server = app.listen(app.get('port'), function() {
            console.log(`Server is up and running on port ${app.get('port')}`);
        });
    }
}


(new App()).run();
