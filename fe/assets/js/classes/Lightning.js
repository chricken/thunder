'use strict';

import settings, { elements } from '../settings.js';

class Lightning {
    constructor() {
        this.start = {
            x: Math.random(),
            y: 0
        };
        this.stepWidth = .03;
        this.minAngle = .4 * Math.PI;
        this.minAngle = .6 * Math.PI;
        this.path = [];
    }
    addPart(){
        
    }
    update() {

    }
    render() {
        const c = elements.spielfeld;
        const ctx = c.getContext('2d');

        ctx.fillRect(
            this.start.x * c.width,
            this.start.y * c.height,
            10,
            10
        )
    }
    checkBorders() {

    }
}

export default Lightning;