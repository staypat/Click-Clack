class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    create(){
        console.log("On Play Scene");
        // bgm

        // add background

        // key bindings
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }
    update(){
    }

}