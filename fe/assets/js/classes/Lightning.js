'use strict';

import settings, { elements } from '../settings.js';

class Lightning {
    constructor() {
        this.minStepWidth = .05;
        this.maxStepWidth = .1;
        this.maxDeltaAngle = .2 * Math.PI;
        this.paths = [[{
            x: Math.random(),
            y: 0,
            angle: Math.random() * (.5 * Math.PI) - (.25 * Math.PI)
        }]];
        this.probabilityToBranch = .1;

        this.addPart();
    }
    addPart() {
        this.paths.forEach(path => {
            let lastPoint = path[path.length - 1];
            let distance = Math.random() * (this.maxStepWidth - this.minStepWidth) + this.minStepWidth;
            let angle = lastPoint.angle + (Math.random() * (this.maxDeltaAngle * 2) - this.maxDeltaAngle);

            // clamp
            angle = Math.max(angle, -Math.PI / 2);
            angle = Math.min(angle, Math.PI / 2);
            let deltaX = Math.sin(angle) * distance;
            let deltaY = Math.cos(angle) * distance;
            
            console.log(lastPoint.y + deltaY);
            let point = {
                x: lastPoint.x + deltaX,
                y: lastPoint.y + deltaY,
                angle
            }
            path.push(point);

            if (Math.random() < this.probabilityToBranch) {

            }

        })

        // Eintragen des nächsten Punktes
        let lowest = this.paths.reduce((max, path) => {
            return Math.max(max, path[path.length-1].y)
        }, 0)
        if(lowest <= 1){
            setTimeout(this.addPart.bind(this), 100)
        }
    }
    update() {

    }
    render() {
        const c = elements.spielfeld;
        const ctx = c.getContext('2d');
        this.paths.forEach(path => {

            // Lightning
            ctx.lineWidth = 10;
            ctx.strokeStyle = '#f00';

            ctx.beginPath();
            ctx.moveTo(
                path[0].x * c.width,
                path[0].y * c.height
            )

            path.forEach(point => {
                ctx.lineTo(
                    point.x * c.width,
                    point.y * c.height
                )
            })
            ctx.stroke();
        })
    }
    checkBorders() {

    }
}

export default Lightning;