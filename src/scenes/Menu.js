class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    create(){
        console.log("On Menu Scene");
        this.add.image(230, game.config.height/2, 'menuTitle').setScale(2.25);
        let title = 'CLICK CLACK';
        let x = -380;
        let yOffsetArray = [240, 215, 230, 215, 200, 0, 280, 300, 290, 315, 350];
        for(let i = 0; i < title.length; i++) {
            let char = title.charAt(i);
            if(i < 5){
                let charText = this.add.bitmapText(x + game.config.width/2, yOffsetArray[i], 'klein', char, 64);
                x += charText.width + 2;
            }else{
                let charText = this.add.bitmapText(x + game.config.width/2, yOffsetArray[i], 'klein', char, 64);
                x += charText.width + 2;
            }
        }
        this.add.image(200, game.config.height/2 + 175, 'button').setScale(1.5);
        this.add.image(100, game.config.height/2 + 250, 'button').setScale(1.5).setAngle(90);
        this.add.image(100, game.config.height/2 + 150, 'button').setScale(1.5).setAngle(270);
        this.add.bitmapText(150, game.config.height/2 + 175, 'klein', 'to navigate buttons').setScale(0.4);
        this.add.bitmapText(150, game.config.height/2 + 175, 'klein', 'to select button').setScale(0.4);
        this.menuBgm = this.sound.add('menu', { 
            mute: false,
            volume: 0.25,
            rate: 1,
            loop: true 
        });
        this.menuBgm.play();
        cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBackgroundColor("#C75E8B");
        this.selectedButtonIndex = 0;
        this.playButton = this.add.image(game.config.width - 175, 150, 'play');
        this.instructionsButton = this.add.image(game.config.width - 175, 275, 'instructions');
        this.creditsButton = this.add.image(game.config.width - 175, 400, 'highscores');
        this.highScoresButton = this.add.image(game.config.width - 175, 525, 'credits');
        cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown', this.handleKeyboardInput, this);
        this.scaleButton();
    }
    
    update(){
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
        let scaleMult = 0.85;
        [this.playButton, this.instructionsButton, this.creditsButton, this.highScoresButton].forEach((button, index) => {
            if(index === this.selectedButtonIndex){
                button.setScale(scaleMult);
            }else{
                button.setScale(0.8); // reset size for other buttons
            }
        });
    }
}
