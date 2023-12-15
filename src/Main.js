// Patrick Hu
// Click Clack
// Creative Tilt Justification: I'm happy with my technical implementation of a grid system that abides by where the player is allowed to move. There were a lot of
// calculations based on the player's relative position rather than just obtaining the x and y properties. This was useful in my checkOverlap function where I had to check the
// intersection between the square and dot bounds which was used as my way of "collision" checking.
// Phaser Major Components Used: particle effects, text objects, animation manager, tween manager, and timers

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