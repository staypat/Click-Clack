// Phaser major components used: particle effects, text objects, animation manager, tween manager, and timers

"use strict"

let config = {
    parent: 'gameView',
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 800,
    height: 600,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Load, Menu, Play, Instructions, Credits]
}
let game = new Phaser.Game(config);
// keyboard vars
let keyA, keyD, cursors;
// game vars
let dotsCount = 0;
let maxDots = 9;
// combo tracker
let combo = 0;