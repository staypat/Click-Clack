class Credits extends Phaser.Scene{
    constructor(){
        super("creditScene");
    }
    create(){
        console.log("On Credits Scene");
        this.cameras.main.setBackgroundColor("#9FC2AA");
        cursors = this.input.keyboard.createCursorKeys();
        this.backText = this.add.text(0, game.config.height - 20, 'Press Left Arrow to go back');
    }
    update(){
        if(cursors.left.isDown){
            this.scene.start('menuScene');
        }
    }
}