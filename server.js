'use strict';

import express from 'express';
import fs from 'fs';
import http from 'http';
import {Server} from 'socket.io';

// Variablen
let scoreTable = [];
const filePath = './data/scoretable.json';

// Express
const expressServer = express();
expressServer.use(express.static('fe', {
    extensions: ['html']
}));

// HTTP
const httpServer = http.Server(expressServer);

// Websocket
const io = new Server(httpServer);

// Socket-Eventlistener
io.on('connect', socket => {
    console.log(socket.id);

    socket.on('score')
})



const init = () => {
    fs.readFile(
        filePath,
        (err, data) => {
            if (!err) {
                scoreTable = JSON.parse(data.toString());
            }
            console.log(scoreTable);
            httpServer.listen(80, err => console.log(err || 'Server läuft'));
        }
    )
}

init();