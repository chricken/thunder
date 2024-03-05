'use strict';

import settings, { elements } from '../settings.js';

class Lightning {
    constructor() {
        this.start = {
            x: Math.random(),
            y: 0,
            angle: Math.random() * (.5 * Math.PI) - (.25 * Math.PI)
        };
        this.minStepWidth = .05;
        this.maxStepWidth = .1;
        this.maxDeltaAngle = .2 * Math.PI;
        this.path = [];

        this.addPart(this.start);
    }
    addPart(lastPoint) {
        let distance = Math.random() * (this.maxStepWidth - this.minStepWidth) + this.minStepWidth;
        let angle = lastPoint.angle + (Math.random() * (this.maxDeltaAngle * 2) - this.maxDeltaAngle);
        
        // clamp
        angle = Math.max(angle, -Math.PI/2);
        angle = Math.min(angle, Math.PI/2);
        
        let deltaX = Math.sin(angle) * distance;
        let deltaY = Math.cos(angle) * distance;

        let point = {
            x: lastPoint.x + deltaX,
            y: lastPoint.y + deltaY,
            angle
        }
        this.path.push(point)

        // Eintragen des nächsten Blitzes
        setTimeout(this.addPart.bind(this), 60, point)
    }
    update() {

    }
    render() {
        const c = elements.spielfeld;
        const ctx = c.getContext('2d');

        // Lightning
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#f00';

        ctx.beginPath();
        ctx.moveTo(
            this.start.x * c.width,
            this.start.y * c.height
        )

        this.path.forEach(point => {
            ctx.lineTo(
                point.x * c.width,
                point.y * c.height
            )
        })
        ctx.stroke();
    }
    checkBorders() {

    }
}

export default Lightning;