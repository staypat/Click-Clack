class Credits extends Phaser.Scene{
    constructor(){
        super("creditScene");
    }
    create(){
        // display set up
        this.cameras.main.setBackgroundColor("#9FC2AA");
        this.menuBgm = this.sound.add('menu', {
            mute: false,
            volume: 0.25,
            rate: 1,
            loop: true 
        });
        this.menuBgm.play();
        cursors = this.input.keyboard.createCursorKeys();
        this.add.image(40, game.config.height - 40, 'button').setScale(1.5).setAngle(180);
        this.add.bitmapText(25, game.config.height/2 - 100, 'klein', 'Based on The Simpsons\nEpisode: \"Please Homer, Don\'t Hammer \'Em\"\nProgrammed by Patrick Hu\nArt Assets by Patrick Hu from Aseprite and Pixilart\nBackground Music and SFX by soundsgreat and Pixabay\nFont by (Font: Klein Family by Zetafonts\n -http://www.zetafonts.com/collection/       )').setScale(0.37).setCenterAlign();
        this.add.text(635, 365, '2922').setColor('black').setScale(1.5);
        this.add.bitmapText(90, game.config.height - 50, 'klein', 'to go back to menu').setScale(0.4);
    }
    update(){
        if(cursors.left.isDown){
            this.menuBgm.stop();
            this.scene.start('menuScene');
        }
    }
}