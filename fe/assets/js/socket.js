'use strict';

import settings from './settings.js';
import game from './game.js';
let socket = io.connect();

const com = {
    sendScore(){
        socket.emit('setScore', settings.score)
    },
    init() {
        socket.on('getScore', game.drawScoreTable)
    }
}

export default com;