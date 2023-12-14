class Instructions extends Phaser.Scene{
    constructor(){
        super("instructionScene");
    }
    create(){
        this.cameras.main.setBackgroundColor("#9FC2AA");
        cursors = this.input.keyboard.createCursorKeys();
        this.instructionsText = this.add.text(game.config.width/3, game.config.height/2, 'Press arrow keys to move the square\nWhen the square is on the dot, \npress A to clear green dots, \npress D to clear red dots, \nand press both at the same time to clear yellow dots');
        this.add.image(100, game.config.height/2, 'button').setScale(1.5).setAngle(180);
        this.add.bitmapText(150, game.config.height/2 + 30, 'klein', 'to navigate buttons').setScale(0.4);
    }
    update(){
        if(cursors.left.isDown){
            this.scene.start('menuScene');
        }
    }
}