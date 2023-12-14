// Phaser major components used: particle effects, text objects, animation manager, tween manager, and timers
// Add animation for dot clear, fix instructions/credits scene, add tween for number in score

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
let keyA, keyD, keyR, cursors;
// game vars
let dotsCount = 0;
let maxDots = 9;
// high score tracker
let highScoreVal = 0;