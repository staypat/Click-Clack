class Instructions extends Phaser.Scene{
    constructor(){
        super("instructionScene");
    }
    create(){
        console.log("On Instructions Scene");
        cursors = this.input.keyboard.createCursorKeys();
        this.instructionsText = this.add.text(game.config.width/3, game.config.height/2, 'Press arrow keys to move the square\nWhen the square is on the dot, \npress A to clear green dots, \npress D to clear red dots, \nand press both at the same time to clear yellow dots');
        this.backText = this.add.text(0, game.config.height - 20, 'Press Left Arrow to go back');
    }
    update(){
        if(cursors.left.isDown){
            this.scene.start('menuScene');
        }
    }
}