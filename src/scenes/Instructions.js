class Instructions extends Phaser.Scene{
    constructor(){
        super("instructionScene");
    }
    create(){
        console.log("On Instructions Scene");
        cursors = this.input.keyboard.createCursorKeys();
    }
    update(){
        if(cursors.left.isDown){
            this.scene.start('menuScene');
        }
    }
}