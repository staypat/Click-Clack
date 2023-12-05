class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    create(){
        console.log("On Menu Scene");
        let menuConfig = {
            fontFamily: 'Courier New',
            fontSize: '28px',
            color: '#000000',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.cameras.main.setBackgroundColor("#9FC2AA");
        this.selectedButtonIndex = 0;
        this.highlightGraphics = this.add.graphics();
        this.add.text(game.config.width/2, 50, 'Click Clack', menuConfig).setOrigin(0.5);
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
            this.selectedButtonIndex = (this.selectedButtonIndex - 1 + 4) % 4; // wrap around
        }else if(cursors.down.isDown){
            this.selectedButtonIndex = (this.selectedButtonIndex + 1) % 4; // wrap around
        }
        this.scaleButton(); // highlight the selected button
        if(cursors.right.isDown){
            if(this.selectedButtonIndex == 0){
                this.scene.start('playScene');
            }else if(this.selectedButtonIndex == 1){
                this.scene.start('instructionScene');
            }else if(this.selectedButtonIndex == 2){
                this.scene.start('scoreScene');
            }else{
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
