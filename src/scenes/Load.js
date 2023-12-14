class Load extends Phaser.Scene{
    constructor(){
        super("loadScene")
    }

    preload(){
        // loading bar
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();
            loadingBar.fillStyle(0xFFFFFF, 1);
            loadingBar.fillRect(0, game.config.height/2, game.config.width * value, 5); 
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        // loading assets
        this.load.image('menuTitle', './assets/title.png');
        this.load.image('dotRed', './assets/redDot.png');
        this.load.image('dotGreen', './assets/greenDot.png');
        this.load.image('dotYellow', './assets/yellowDot.png');
        this.load.image('player', './assets/player.png');
        this.load.image('button', './assets/button.png');
        this.load.image('blankbutton', './assets/blankbutton.png');
        this.load.bitmapFont('klein', './assets/fonts/KleinText/KleinText.png', './assets/fonts/KleinText/KleinText.xml'); // (Font: Klein Family by Zetafonts -http://www.zetafonts.com/collection/2922)
        this.load.spritesheet('pop', './assets/pop.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 7});

        

        // audio
        this.load.audio('bgm', './assets/bgm.mp3'); // Sound Effect from Pixabay
        this.load.audio('menu', './assets/menu.mp3'); // Sound Effect from Pixabay
        this.load.audio('click', './assets/click.mp3'); // Sound Effect by soundsgreat from Pixabay
        this.load.audio('clack', './assets/clack.mp3'); // Sound Effect from Pixabay
        this.load.audio('start', './assets/start.mp3'); // Sound Effect from Pixabay
        
        
    }

    create(){
        this.scene.start('menuScene');
    }
}