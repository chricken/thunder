'use strict';

import Lightning from './classes/Lightning.js';
import Player from './classes/Player.js';
import Pott from './classes/Pott.js';
import settings, { elements } from './settings.js';

const game = {
    update() {
        settings.player.update();

        game.render();
        if (!settings.paused) {
            requestAnimationFrame(game.update);
        }
    },
    render() {
        const c = elements.spielfeld;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, c.width, c.height);

        // Create linear gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, c.height * .8);
        gradient.addColorStop(0, 'midnightblue');
        gradient.addColorStop(1, 'black');

        // Fill with gradient
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, c.width, c.height);

        settings.player.render();

        settings.lightning.render();
    },
    handleResize() {
        let w = window.innerWidth;
        let h = window.innerHeight;
        let size = Math.min(w, h);

        elements.spielfeld.width = size * .95;
        elements.spielfeld.height = size * .95;
    },
    init() {
        game.handleResize();
        settings.lightning = new Lightning();
        settings.player = new Player(.1);
        requestAnimationFrame(game.update);
    }
}

export default game;