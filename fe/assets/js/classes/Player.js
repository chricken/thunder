'use strict';

import settings, { elements } from '../settings.js';
import Score from './Score.js';
import game from '../game.js';

class Player {
    constructor(handleGameOver) {
        this.posX = .1;
        this.posY = 1;
        this.speed = .008;
        this.size = .05;
        this.goldToAdd = 1
        // settings.score = 0;
        this.handleGameOver = handleGameOver;
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
    addGold() {

        settings.score.points += this.goldToAdd;
        // elements.score.innerHTML = settings.score;
        game.drawScore();
        console.log(this.goldToAdd, settings.score.points);
        settings.scores.push(new Score(this.posX, this.posY, this.goldToAdd))
        this.goldToAdd += 1;

    }
    update(game) {
        this.posX += this.speed;
        this.checkBorders();
        this.hitTestPotts();
        this.hitTestKillZones();
    }
    kill() {
        // Auf den nächsten Refresh warten, damit im score-Element auf jeden Fall der richtige Wert steht
        requestAnimationFrame(
            this.handleGameOver
        )
    }
    hitTestKillZones() {
        settings.killZones.forEach(killZone => {
            let deltaX = killZone.x - this.posX;
            let deltaY = 0;
            let distance = Math.hypot(deltaX, deltaY);
            if (distance <= this.size / 2) {
                this.kill();
            }
        })
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