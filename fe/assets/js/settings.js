'use strict';

const settings = {
    elements: {},
    potts: [],
    sparks: [],
    delayNewLightning: 1200,
    timerIDNewLightning: false,

    player: false,
    killZones: [],
    scores: [],
    score: {
        name: '',
        points: 0
    },
    gameOver: false,

    scoreTable: [],

    // ID für die Runde, um die Spiele voneineder unterscheiden zu können
    // Ist wichtig, um nicht den requestAnimationFrame doppelt laufen zu lassen
    roundID: 0,
    dummyNames: [
        'J. Doe', 'Niemand', 'k.A.', 'Keine Angabe', 'Nobody', 'Anonym', 'Anonymous', 'Unknown',
        'Invisible Man', 'Dr. No', 'Hollow Man', 'Max Mustermann', 'Otto Normalverbraucher',
        'Unbekannt', 'Geheim', 'Keiner', 'Leer', 'Platzhalter', 'Name', 'Person', 'X', 'Unbekannte Person',
        'N.N. (Nomen nescio)', 'XYZ', 'Miss Mysterious', 'John Doe', 'Jane Doe', 'Unidentified', 'Empty',
        'Placeholder', 'Noname', 'Mystery Man', 'Ghost', 'Secret', 'Unbenannt', 'Unbekannte/r',
        'Unbekannter Heldenname', 'Geistername', 'Inkognito', 'Phantom', 'Geheimnisvolle Person',
        'Unbekannte Identität', 'Anon', 'Mr./Mrs. X', 'Unbekannter Benutzer', 'Geheimnisvoller Fremder',
        'Leerzeichen', 'Anonyme Person', 'Platzhaltername', 'Unbekannte Entität', 'Alias',
        'Unbekannter Besitzer', 'Verborgene Identität', 'Geheimagent', 'X. X.', 'Schattenwesen',
        'Mysterium', 'Verschleierter Name', 'Geheimnisvolles Wesen', 'Phantomfigur',
        'Namensloser Protagonist', 'Dunkle Gestalt', 'Geisterhafter Unbekannter', 'Unsichtbares Wesen',
        'Rätselhafte Persönlichkeit', 'Mysterium', 'Geheimnisvoller Fremdling', 'Schleiergestalt',
        'Phantomname', 'Nebelwesen', 'Unbekannte Legende', 'Mystische Erscheinung', 'Namenloser Schatten',
        'Geisterhafte Gestalt', 'Rätselhafte Anonymität', 'Unsichtbare Identität', 'Verschwommener Charakter',
        'Unbekannte Aura', 'Geheimnisvolles Mysterium'
    ]
}
export default settings;
export const elements = settings.elements;