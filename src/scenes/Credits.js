class Credits extends Phaser.Scene{
    constructor(){
        super("creditScene");
    }
    create(){
        console.log("On Credits Scene");
        cursors = this.input.keyboard.createCursorKeys();
    }
    update(){
        if(cursors.left.isDown){
            this.scene.start('menuScene');
        }
    }
}