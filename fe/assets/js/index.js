'use strict';

import settings, { elements } from './settings.js';
import game from './game.js';
import com from './socket.js';

// FUNKTIONEN
const domMapping = () => {
    elements.spielfeld = document.querySelector('#spielfeld');
    elements.score = document.querySelector('#score');
}

const appendEventlisteners = () => {
    window.addEventListener('resize', game.handleResize);
    window.addEventListener('keydown', evt => {
        if (evt.key == ' ' || evt.key == 'Shift' || evt.key == 'Control') {
            settings.player.handleTurn();
        }
    })
}



const init = () => {
    domMapping();
    appendEventlisteners();
    game.init();
    com.init();
}

// INIT
init();