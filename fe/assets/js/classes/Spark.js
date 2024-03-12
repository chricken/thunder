'use strict';

import settings, { elements } from '../settings.js';

class Spark {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = [220, 230, 255, .8];
        this.fadeOut = .96;
        this.size = Math.random() * .005 + .002;
        let speed = .001;
        this.speedX = Math.random() * speed - (speed / 2);
        this.speedY = Math.random() * speed - (speed / 2);
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.color[3] *= this.fadeOut;
        if (this.color[3] <= 0.1) {
            settings.sparks = settings.sparks.filter(spark => spark != this);
        }
    }

    render() {
        const c = elements.spielfeld;
        const ctx = c.getContext('2d');

        ctx.fillStyle = `rgba(${this.color.join(',')})`

        ctx.fillRect(
            (this.x - this.size / 2) * c.width,
            (this.y - this.size / 2) * c.height,
            (this.size) * c.width,
            (this.size) * c.height,
        )

    }
}

export default Spark;