class Scores extends Phaser.Scene{
    constructor(){
        super("scoreScene");
    }
    create(){
        console.log("On Scores Scene");
        cursors = this.input.keyboard.createCursorKeys();
    }
    update(){
        if(cursors.left.isDown){
            this.scene.start('menuScene');
        }
    }
}