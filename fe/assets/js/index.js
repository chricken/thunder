'use strict';

import settings, { elements } from './settings.js';
import game from './game.js';

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

const loadData = () => {
    return fetch('/score').then(
        res => res.json()
    ).then(
        res => settings.scoreTable = res
    )
}

const init = () => {
    loadData().then(
        game.init
    ).then(
        game.drawScore
    ).catch(
        console.warn
    )
    domMapping();
    appendEventlisteners();

}

// INIT
init();