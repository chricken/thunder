'use strict';

import settings, { elements } from '../settings.js';

class Player {
    constructor() {
        this.posX = .1;
        this.posY = 1;
        this.speed = .008;
        this.size = .05;
        this.goldToAdd = 1
        this.score = 0;
        // Debouncer
        this.reset = this.resetGold();
    }
    resetGold() {
        let timerID = false;

        return () => {
            clearTimeout(timerID);
            timerID = setTimeout(() => {
                this.goldToAdd = 1;
            }, settings.delayNewLightning / 2)
        }
    }
    addGold(callback) {

        this.score += this.goldToAdd;
        elements.score.innerHTML = this.score;
        this.goldToAdd += 1;
        // this.reset();


    }
    hitTestPotts() {
        settings.potts.forEach(pott => {
            let deltaX = pott.x - this.posX;
            let deltaY = 0;
            let distance = Math.hypot(deltaX, deltaY);
            if (distance <= pott.size) {
                this.addGold();
                pott.kill();
            }
        })
    }
    update() {
        this.posX += this.speed;
        this.checkBorders();
        this.hitTestPotts();

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
            (this.posX - this.size / 4) * c.width,
            (this.posY - this.size) * c.height,
            (this.size / 2) * c.height,
            this.size * c.height,
        )
    }
}

export default Player;