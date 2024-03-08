'use strict';

import settings, { elements } from '../settings.js';

class Score {
    constructor(x, y, score) {
        Object.assign(this, { x, y, score });
        this.color = [0, 100, 50, 1];         // Farbe als Array 
        this.varianzY = .3;
        this.fadeSpeed = .03;
        this.steigung = -.003;
        this.size = .08;

        this.y -= Math.random() * this.varianzY;
    }

    update() {
        this.color[3] -= this.fadeSpeed;
        this.y += this.steigung;
        if (this.color[3] <= 0)
            settings.scores = settings.scores.filter(el => el != this);
        // console.log(settings.scores.length);
    }

    render() {
        const c = elements.spielfeld;
        const ctx = c.getContext('2d');

        ctx.fillStyle = `hsla(${this.color[0]}, ${this.color[1]}%, ${this.color[2]}%,${this.color[3]})`;

        ctx.textAlign = 'center';
        ctx.font = `${this.size * c.height}px Tahoma, Geneva, Verdana, sans-serif`;
        ctx.fillText(
            this.score,
            this.x * c.width,
            (this.y - this.size * .5) * c.height
        )

    }

}

export default Score;