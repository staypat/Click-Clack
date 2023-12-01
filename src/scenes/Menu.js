class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    create(){
        console.log("On Menu Scene");
        let menuConfig = {
            fontFamily: 'Courier New',
            fontSize: '28px',
            color: '#FAF4C3',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.cameras.main.setBackgroundColor("#9FC2AA");
        this.add.text(game.config.width/2, game.config.height/2 - 64, 'Click Clack', menuConfig).setOrigin(0.5);
        cursors = this.input.keyboard.createCursorKeys();
    }
    update(){
        if(cursors.up.isDown){
            this.scene.start('playScene');
        }
    }
}