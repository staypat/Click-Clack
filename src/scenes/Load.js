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
            loadingBar.fillRect(0, game.config.width/2, game.config.width * value, 5); 
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        // loading assets
        //this.load.image('background', './assets/background.png');
        

        // audio
        //this.load.audio('bgm', './assets/Crystal_Run.mp3'); // Audio by Patrick Hu (Me) from GarageBand
        
    }
}