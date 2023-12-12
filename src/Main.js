"use strict"

let config = {
    parent: 'gameView',
    type: Phaser.AUTO,
    render: {
        pixelArt: true,
        antialias: true
    },
    physics: {
        default: 'arcade',
    },
    width: 800,
    height: 600,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Load, Title, Menu, Play, Instructions, Scores, Credits]
}
let game = new Phaser.Game(config);
// keyboard vars
let keyA, keyD, cursors;
// game vars
let dotsCount = 0;
let maxDots = 9;
// combo tracker
let combo = 0;