'use strict';

const settings = {
    elements: {},
    potts: [],
    delayNewLightning: 1200,
    timerIDNewLightning:false,
    
    player: false,
    killZones: [],
    scores: [],
    gameOver: false,

    // ID für die Runde, um die Spiele voneineder unterscheiden zu können
    // Ist wichtig, um nicht den requestAnimationFrame doppelt laufen zu lassen
    roundID:0,  
}

export default settings;
export const elements = settings.elements;