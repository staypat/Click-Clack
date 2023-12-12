class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }
    
    create(){
        console.log("On Title Scene");
        this.add.image(game.config.width/2, game.config.height/2, 'menuTitle').setScale(3);
        let title = 'CLICK CLACK';
        let x = -270;
        let yOffsetArray = [210, 195, 210, 195, 180, 0, 280, 300, 290, 325, 350];
        for(let i = 0; i < title.length; i++) {
            let char = title.charAt(i);
            if(i < 5){
                let charText = this.add.bitmapText(x + game.config.width/2, yOffsetArray[i], 'klein', char);
                x += charText.width + 5;
            }else{
                let charText = this.add.bitmapText(x + game.config.width/2 + 35, yOffsetArray[i], 'klein', char);
                x += charText.width + 5;
            }
        }
        this.add.image(300, game.config.height/2 + 200, 'button').setScale(1.5);
        this.add.bitmapText(150, game.config.height/2 + 175, 'klein', 'Press           to continue').setScale(0.5);
        this.menuBgm = this.sound.add('menu', { 
            mute: false,
            volume: 0.25,
            rate: 1,
            loop: true 
        });
        this.menuBgm.play();
        cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBackgroundColor("#C75E8B");
        this.input.keyboard.on('keydown', ()=>{
            if(cursors.right.isDown){
                this.sound.play('start', {volume: 0.5});
                this.menuBgm.stop();
                this.scene.start('menuScene');
            }
        })
    }
    
    update(){
    }
}
