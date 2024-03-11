'use strict';
const scoretable = []

for (let i = 0; i < 200; i++) {
    let score = {
        name: ((Math.random() * 1e17).toString(22)),
        points: ~~(Math.random() * 1000)
    }
    scoretable.push(score)
}
scoretable.sort((a, b) => b.points - a.points);
console.log(JSON.stringify(scoretable));
