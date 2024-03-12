'use strict';

import settings from './settings.js';
import game from './game.js';
let socket = io.connect();

const com = {
    sendScore() {
        socket.emit('setScore', settings.score)
    },
    sendNewScore(){
        socket.emit('setNewScore', settings.score);
    },
    init() {
        socket.on('getScore', data => {
            settings.scoreTable = data;
            game.drawScoreTable(data);
        })
    }
}

export default com;