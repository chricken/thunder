'use strict';

import settings, { elements } from '../settings.js';
import Pott from './Pott.js';
import helpers from '../helpers.js';

class Lightning {
    constructor() {
        this.minStepWidth = .05;
        this.maxStepWidth = .1;
        this.maxDeltaAngle = .2 * Math.PI;
        this.lineWidth = .005;
        this.probabilityToBranch = .15;
        this.shiver = .01;
        this.minDelayNewPart = 30;
        this.maxDelayNewPart = 60;
        this.delayRemoveMainPath = 800;
        this.delayNewLightning = 1000;
        this.fadeoutSpeed = 20;

        this.paths = [[{
            x: Math.random(),
            y: -.1,
            angle: Math.random() * (.5 * Math.PI) - (.25 * Math.PI),
            color: helpers.createLightningColor()
        }]];

        this.addPart();
    }
    removePath(path) {
        let point = path[0];
        settings.potts.push(new Pott(path[path.length - 1]));
        const recolorAndKill = () => {
            // console.log(point.color);
            let color = point.color.split(',');                         // Farbe aufteilen
            let light = color[color.length - 1];                    // Helligkeit nehmen
            light = light.substring(0, light.length - 2).trim();    // %) entfernen
            light -= this.fadeoutSpeed;                                            // Dekrementieren
            color.pop();                                    // Light aus dem Array entfernen
            color.push(light + '%)');                               // Neues Light anhängen
            color = color.join(',');
            // console.log(color);
            point.color = color;
            // console.log(color);

            if (light <= 0) {
                this.paths = this.paths.filter(el => el != path)
                clearInterval(recolorID)
            }
        }
        // recolorAndKill();
        let recolorID = setInterval(recolorAndKill, 30)
    }
    addPart() {
        this.paths.forEach(path => {
            let lastPoint = path[path.length - 1];
            let distance = Math.random() * (this.maxStepWidth - this.minStepWidth) + this.minStepWidth;
            let angle = lastPoint.angle + (Math.random() * (this.maxDeltaAngle * 2) - this.maxDeltaAngle);

            // clamp
            angle = Math.max(angle, -Math.PI / 2);
            angle = Math.min(angle, Math.PI / 2);

            // Positionen
            let deltaX = Math.sin(angle) * distance;
            let deltaY = Math.cos(angle) * distance;
            let x = lastPoint.x + deltaX;
            let y = lastPoint.y + deltaY;

            // Clamp
            if (x < -this.lineWidth) {
                angle = 0;
                x = .01
            }
            if (x > 1 + this.lineWidth) {
                angle = 0;
                x = .99
            }

            let point = { x, y, angle, color: helpers.createLightningColor() };
            path.push(point);

            if (Math.random() < this.probabilityToBranch) {
                // let newPath = JSON.parse(JSON.stringify(path));
                let newPath = path.map(point => { return { ...point } });
                newPath.map(point => {
                    point.x += (Math.random() * this.shiver - (this.shiver / 2));
                    point.y += (Math.random() * this.shiver - (this.shiver / 2));
                });
                newPath[0].color = helpers.createLightningColor();
                this.paths.unshift(newPath);
            }

        })

        // Eintragen des nächsten Punktes
        let lowest = this.paths.reduce((max, path) => {
            return Math.max(max, path[path.length - 1].y)
        }, 0)

        // console.log(lowest);

        if (lowest <= 1) {
            setTimeout(
                this.addPart.bind(this),
                helpers.createNumber(
                    this.minDelayNewPart,
                    this.maxDelayNewPart
                )
            )
        } else {
            // Andere Pfade löschen
            this.paths
                .filter(path => path[path.length - 1].y < 1)
                .forEach(this.removePath.bind(this));

            // Hauptpfad(e) löschen
            setTimeout(() => {
                this.paths
                    .filter(path => path[path.length - 1].y >= 1)
                    .forEach(this.removePath.bind(this));

                setTimeout(() => {
                    settings.lightning = new Lightning();
                }, this.delayNewLightning)

            }, this.delayRemoveMainPath)
            // this.paths = this.paths.filter(path => path[path.length - 1].y >= 1);
        }
    }
    update() {

    }
    render(blur = 0) {
        // console.log(this);
        const c = elements.spielfeld;
        const ctx = c.getContext('2d');

        // ctx.filter = `blur(${blur * c.width}px)`;

        this.paths.forEach(path => {

            // Lightning
            ctx.lineWidth = c.width * this.lineWidth;
            ctx.strokeStyle = path[0].color;
            console.log();
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