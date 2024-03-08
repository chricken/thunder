'use strict';

import Lightning from './classes/Lightning.js';
import Player from './classes/Player.js';
import Pott from './classes/Pott.js';
import settings, { elements } from './settings.js';

const game = {
    update(roundID) {
        settings.potts.forEach(pott => pott.update());
        settings.scores.forEach(score => score.update());

        // Blitze rendern
        // Weil der Blitz sich nach anderen Timing ausbreitet und es hier sinst zu 
        // Darstellungsfehlern kommen kann, muss zuerst der Blitz gerendert werden, bevor er player upgedatet werden kann.
        game.renderLightning();

        // Spielerposition aktualisieren
        settings.player.update();

        // Alles außer die Blitze rendern
        game.renderOthers();

        if (!settings.gameOver && settings.roundID == roundID) {
            requestAnimationFrame(() => game.update(roundID));
        }
    },
    drawScore() {
        elements.score.innerHTML = '';
        console.log(settings);
        const scoreTable = [
            ...settings.scoreTable,
            settings.score
        ];

        scoreTable.sort((a, b) => b.points - a.points);

        scoreTable.forEach(score => {
            let elScore = document.createElement('div');
            elements.score.append(elScore);
            elScore.className = 'oneScore'

            // Score des aktuellen Spielers hervorheben
            if (score == settings.score) {
                elScore.classList.add('currentPlayer');
            }

            // Name des Spielers
            if (score.name) {
                let elName = document.createElement('div');
                elName.className = 'scoreName';
                elName.innerHTML = score.name;
                elScore.append(elName);
            }

            // Punkte
            let elPoints = document.createElement('div');
            elPoints.className = 'scorePoints';
            elPoints.innerHTML = score.points;
            elScore.append(elPoints);
        })

    },
    renderLightning() {
        const c = elements.spielfeld;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, c.width, c.height);

        // Create linear gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, c.height * .8);
        gradient.addColorStop(0, 'midnightblue');
        gradient.addColorStop(1, 'black');

        // Fill with gradient
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, c.width, c.height);

        if (settings.lightning)
            settings.lightning.render();
    },
    renderOthers() {
        const c = elements.spielfeld;
        const ctx = c.getContext('2d');


        // Score 
        settings.scores.forEach(score => score.render());



        // Potts rendern
        settings.potts.forEach(pott => pott.render())

        // Spieler rendern
        settings.player.render();
    },
    gameOver() {
        console.warn('Game Over');
        settings.gameOver = true;

        // RundenID hochzählen, um diese von der alten Runde unterschieden zu können
        settings.roundID++;

        // In der alten Runde keinen neuen Blitz zeichnen lassen
        clearTimeout(settings.timerIDNewLightning);

        console.log(settings.scoreTable.some(score => {
            console.log(score, settings.score.points);
            return settings.score.points > score.points
        }));
        if (settings.scoreTable.some(score => settings.score.points > score.points)) {
            let name = prompt('Sie haben einen Platz im Highscore erreicht.\nBitte geben Sie ihren Namen ein');
            settings.score.name = name;
            fetch('/score', {
                method:'post',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(settings.score)
            })
            // Antwort wird nicht verarbeitet
        }

        if (confirm(`Wollen Sie noch eine Runde spielen?`)) {
            // game.reset();
            location.reload();
        }

    },
    reset() {
        settings.potts = [];
        settings.killZones = [];
        settings.scores = [];
        settings.gameOver = false;
        settings.player = new Player(game.gameOver);
        settings.lightning = false;
        setTimeout(() => {
            settings.lightning = new Lightning();
        },
            settings.delayNewLightning
        )
        requestAnimationFrame(() => game.update(settings.roundID));
    },
    handleResize() {
        let w = window.innerWidth;
        let h = window.innerHeight;
        let size = Math.min(w, h);

        elements.spielfeld.width = size * .95;
        elements.spielfeld.height = size * .95;
    },
    init() {
        game.handleResize();
        game.reset();
    }
}

export default game;