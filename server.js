'use strict';

import { log } from 'console';
import express from 'express';
import fs from 'fs';
import http from 'http';
import { Server } from 'socket.io';

// Variablen
let scoreTable = [];
const filePath = './data/scoretable.json';
let numScores = 12;
let overAllNumScores = 200;

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
    // console.log(socket.id);

    socket.on('setScore', score => {
        // console.log(score);
        score.name = ''
        // Kopie anlegen
        let scores = [...scoreTable];

        // Neuen Score anhängen
        scores.push(score);

        // Reihenfolge sortieren
        scores.sort((a, b) => b.points - a.points);

        // Index des neuen Eintrags
        let index = scores.indexOf(score);

        // console.log(index);

        // Index als zusätzliche Info einhängen
        for (let i = 0; i < scores.length; i++) {
            scores[i].index = i;
        }

        // Gewünschte Scores ausschneiden
        let min = Math.max(index - ~~(numScores / 2), 0)
        scores = scores.splice(min, numScores);
        // Leere Felder rausnehmen
        scores = scores.filter(() => true);

        // Ergebnis zurückgeben
        socket.emit('getScore', scores)
    })

    socket.on('setNewScore', score => {
        scoreTable.push(score);
        scoreTable.sort((a, b) => b.points - a.scores);
        if (scoreTable.length > overAllNumScores)
            scoreTable.length = overAllNumScores;

        fs.writeFile(
            filePath,
            JSON.stringify(scoreTable),
            (err) => {
                if (err) console.warn(err);
            }
        )
    })
})



const init = () => {
    fs.readFile(
        filePath,
        (err, data) => {
            if (!err) {
                scoreTable = JSON.parse(data.toString());
            }
            // console.log(scoreTable);
            httpServer.listen(80, err => console.log(err || 'Server läuft'));
        }
    )
}

init();