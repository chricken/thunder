'use strict';

import settings, { elements } from '../settings.js';

class Player {
    constructor() {
        this.posX = .1;
        this.posY = 1;
        this.speed = .01;
        this.size = .05;
    }
    changeDirection() {

    }
    update() {
        this.posX += this.speed;
        this.checkBorders();
    }
    checkBorders() {
        if (this.posX > (1 - this.size / 2) || this.posX < this.size / 2) {
            this.handleTurn()
        }
    }
    handleTurn() {
        this.speed *= -1;
    }
    render() {
        let c = elements.spielfeld;
        let ctx = c.getContext('2d');

        ctx.fillStyle = '#f00';

        ctx.fillRect(
            (this.posX - this.size / 2) * c.width,
            (this.posY - this.size) * c.height,
            this.size * c.height,
            this.size * c.height,
        )
    }
}

export default Player;