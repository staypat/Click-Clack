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
        this.load.image('dotRed', './assets/redDot.png');
        this.load.image('dotGreen', './assets/greenDot.png');
        this.load.image('dotYellow', './assets/yellowDot.png');
        this.load.image('play', './assets/play.png');
        this.load.image('instructions', './assets/instructions.png');
        this.load.image('credits', './assets/credits.png');
        this.load.image('highscores', './assets/highScores.png');
        this.load.image('player', './assets/player.png');

        

        // audio
        //this.load.audio('bgm', './assets/Crystal_Run.mp3'); // Audio by Patrick Hu (Me) from GarageBand
        
    }

    create(){
        console.log("On Load Scene");
        this.scene.start('menuScene');
    }
}