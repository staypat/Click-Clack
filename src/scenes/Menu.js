class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    create(){
        console.log("On Menu Scene");
        this.add.image(230, 150, 'menuTitle').setScale(2.25);
        let title = 'CLICK CLACK';
        let x = -380;
        let yOffsetArray = [90, 65, 80, 65, 50, 0, 130, 150, 140, 165, 200];
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
        this.add.image(100, game.config.height/2 + 200, 'button').setScale(1.5);
        this.add.image(100, game.config.height/2 + 100, 'button').setScale(1.5).setAngle(90);
        this.add.image(100, game.config.height/2, 'button').setScale(1.5).setAngle(270);
        this.add.bitmapText(150, game.config.height/2 + 30, 'klein', 'to navigate buttons').setScale(0.4);
        this.add.bitmapText(150, game.config.height/2 + 185, 'klein', 'to select button').setScale(0.4);
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
        this.playButton = this.add.image(game.config.width - 175, 150, 'blankbutton');
        this.instructionsButton = this.add.image(game.config.width - 175, 275, 'blankbutton');
        this.creditsButton = this.add.image(game.config.width - 175, 400, 'blankbutton');
        this.add.bitmapText(150, game.config.height/2 + 30, 'klein', 'Play').setScale(0.4);
        this.add.bitmapText(150, game.config.height/2 + 30, 'klein', 'How To').setScale(0.4);
        this.add.bitmapText(150, game.config.height/2 + 30, 'klein', 'Credits').setScale(0.4);

        cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown', this.handleKeyboardInput, this);
        this.scaleButton();
    }
    
    update(){
    }

    handleKeyboardInput() {
        if(cursors.up.isDown){
            this.sound.play('click', {volume: 1});
            this.selectedButtonIndex = (this.selectedButtonIndex - 1 + 3) % 3; // wrap around
        }else if(cursors.down.isDown){
            this.sound.play('click', {volume: 1});
            this.selectedButtonIndex = (this.selectedButtonIndex + 1) % 3; // wrap around
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
            }else{
                this.sound.play('start', {volume: 0.5});
                this.menuBgm.stop();
                this.scene.start('creditScene');
            }
        }
    }
    
    // function to scale the selected button
    scaleButton(){
        [this.playButton, this.instructionsButton, this.creditsButton].forEach((button, index) => {
            if(index === this.selectedButtonIndex){
                button.setScale(6.5, 1);
            }else{
                button.setScale(5.5, 1); // reset size for other buttons
            }
        });
    }
}
