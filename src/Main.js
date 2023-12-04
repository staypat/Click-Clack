"use strict"

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 800,
    height: 600,
    scene: [Load, Menu, Play, Instructions, Scores, Credits]
}
let game = new Phaser.Game(config);
// keyboard vars
let keyA, keyD, cursors;
// game vars
let dotsCount = 0;
let maxDots = 9;
// high score tracker
let highScoreVal = 0;