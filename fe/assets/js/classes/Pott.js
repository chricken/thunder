'use strict';

import helpers from '../helpers.js';
import settings, { elements } from '../settings.js';

class Pott {
    constructor(point) {
        this.x = point.x;
        this.y = point.y;
        this.color = '#0f0';
        this.size = .016;
        this.lifetime = helpers.createNumber(800,1500);

        this.speedY = .02;

        setTimeout(
            this.kill.bind(this),
            this.lifetime
        )
    }
    kill(){
        // console.log(this);
        settings.potts = settings.potts.filter(pott => pott !=  this)
    }
    
    render() {
        let c = elements.spielfeld;
        let ctx = c.getContext('2d');
        // console.log(this.x, this.y);
        ctx.fillStyle = this.color;
        
        ctx.fillRect(
            (this.x - (this.size / 2)) * c.width,
            (this.y - (this.size / 2)) * c.height,
            this.size * c.width,
            this.size * c.height
            )
        }
        
        update() {
        let c = elements.spielfeld;
        this.y += this.speedY;
        if(this.y >= 1 - this.size ){
            this.speedY = 0;
            this.y = 1 - this.size;
        }
    }
}

export default Pott;