'use strict';

import settings from './settings.js';
let socket = io.connect();

const com = {
    sendScore(){
        socket.emit('setScore', settings.score)
    },
    init() {
        socket.on('getScore', scoreTable)
    }
}

export default com;