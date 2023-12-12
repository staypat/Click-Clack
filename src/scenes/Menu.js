class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    create(){
        console.log("On Menu Scene");
        this.menuBgm = this.sound.add('menu', { 
            mute: false,
            volume: 0.25,
            rate: 1,
            loop: true 
        });
        this.menuBgm.play();
        this.cameras.main.setBackgroundColor("#9FC2AA");
        this.selectedButtonIndex = 0;
        this.highlightGraphics = this.add.graphics();
        this.playButton = this.add.image(game.config.width/2, 150, 'play').setInteractive();
        this.instructionsButton = this.add.image(game.config.width/2, 275, 'instructions').setInteractive();
        this.creditsButton = this.add.image(game.config.width/2, 400, 'highscores').setInteractive();
        this.highScoresButton = this.add.image(game.config.width/2, 525, 'credits').setInteractive();
        cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown', this.handleKeyboardInput, this);
        this.scaleButton();
    }

    handleKeyboardInput() {
        if(cursors.up.isDown){
            this.sound.play('click', {volume: 1});
            this.selectedButtonIndex = (this.selectedButtonIndex - 1 + 4) % 4; // wrap around
        }else if(cursors.down.isDown){
            this.sound.play('click', {volume: 1});
            this.selectedButtonIndex = (this.selectedButtonIndex + 1) % 4; // wrap around
        }
        this.scaleButton(); // scale the selected button
        if(cursors.right.isDown){
            if(this.selectedButtonIndex == 0){
                this.sound.play('start', {volume: 0.5});
                this.menuBgm.stop();
                this.scene.start('playScene');
            }else if(this.selectedButtonIndex == 1){
                this.sound.play('start', {volume: 0.5});
                this.menuBgm.stop();
                this.scene.start('instructionScene');
            }else if(this.selectedButtonIndex == 2){
                this.sound.play('start', {volume: 0.5});
                this.menuBgm.stop();
                this.scene.start('scoreScene');
            }else{
                this.sound.play('start', {volume: 0.5});
                this.menuBgm.stop();
                this.scene.start('creditScene');
            }
        }
    }
    
    // function to scale the selected button
    scaleButton(){
        let scaleMult = 1.25;
        [this.playButton, this.instructionsButton, this.creditsButton, this.highScoresButton].forEach((button, index) => {
            if(index === this.selectedButtonIndex){
                button.setScale(scaleMult);
            }else{
                button.setScale(1); // reset size for other buttons
            }
        });
    }
    
    update(){
    }
}