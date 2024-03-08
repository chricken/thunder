'use strict';

import express from 'express';
import fs from 'fs';

const filePath = './data/scoretable.json';

const server = express();
let scoreTable = [];

server.use(express.static('fe', {
    extensions: ['html']
}));

server.use(express.json());

server.get('/score', (request, response) => {
    // console.log('score');
    response.json(scoreTable);
})

server.post('/score', (request, response) => {
    console.log(request.body);
    scoreTable.push(request.body);
    scoreTable.sort((a, b) => a.points - b.points);
})

const init = () => {
    fs.readFile(
        filePath,
        (err, data) => {
            if (!err) {
                scoreTable = JSON.parse(data.toString());
            }
            server.listen(80, err => console.log(err || 'Server läuft'));
        }
    )
}

init();