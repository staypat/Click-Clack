class Scores extends Phaser.Scene{
    constructor(){
        super("scoreScene");
    }
    create(){
        console.log("On Scores Scene");
        cursors = this.input.keyboard.createCursorKeys();
        this.backText = this.add.text(0, game.config.height - 20, 'Press Left Arrow to go back');
    }
    update(){
        if(cursors.left.isDown){
            this.scene.start('menuScene');
        }
    }
}