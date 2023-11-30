"use strict"

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 1280, //800, 640
    height: 720, // 600, 480
    scene: [Load]
}
let game = new Phaser.Game(config);
// keyboard vars
let keyA, keyD, cursors;
// this.cursors = this.input.keyboard.createCursorKeys();
// high score tracker
let highScoreVal = 0;