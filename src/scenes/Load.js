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
        
        // anims
        this.load.spritesheet('redPop', './assets/redPop.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 7});
        this.load.spritesheet('greenPop', './assets/greenPop.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 7});
        this.load.spritesheet('yellowPop', './assets/yellowPop.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 7});

        // audio
        this.load.audio('bgm', './assets/bgm.mp3'); // Sound Effect from Pixabay
        this.load.audio('menu', './assets/menu.mp3'); // Sound Effect from Pixabay
        this.load.audio('click', './assets/click.mp3'); // Sound Effect by soundsgreat from Pixabay
        this.load.audio('clack', './assets/clack.mp3'); // Sound Effect from Pixabay
        this.load.audio('start', './assets/start.mp3'); // Sound Effect from Pixabay
        
        
    }

    create(){
        // anims create
        this.anims.create({
            key: 'red',
            frames: this.anims.generateFrameNumbers('redPop', { start: 0, end: 7, first: 0}),
            frameRate: 32
        });
        this.anims.create({
            key: 'green',
            frames: this.anims.generateFrameNumbers('greenPop', { start: 0, end: 7, first: 0}),
            frameRate: 32
        });
        this.anims.create({
            key: 'yellow',
            frames: this.anims.generateFrameNumbers('yellowPop', { start: 0, end: 7, first: 0}),
            frameRate: 32
        });
        this.scene.start('menuScene');
    }
}