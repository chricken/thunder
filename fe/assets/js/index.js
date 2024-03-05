'use strict';

import settings, { elements } from './settings.js';
import game from './game.js';

// FUNKTIONEN
const domMapping = () => {
    elements.spielfeld = document.querySelector('#spielfeld');
}

const appendEventlisteners = () => {
    window.addEventListener('resize', game.handleResize);
}

const init = () => {
    domMapping();
    appendEventlisteners();

    game.init();
}

// INIT
init();