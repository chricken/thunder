'use strict';

const helpers = {
    createNumber(min, max) {
        return ~~(Math.random() * (max - min + 1) + min);

    },
    createLightningColor() {
        let color = `hsl(${helpers.createNumber(180, 230)},${helpers.createNumber(90, 100)}%,${helpers.createNumber(90, 100)}%)`
        return color;
    }
}

export default helpers;