class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    create(){
        console.log("On Menu Scene");
        let menuConfig = {
            fontFamily: 'Courier New',
            fontSize: '28px',
            color: '#FAF4C3',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.cameras.main.setBackgroundColor("#9FC2AA");
        this.selectedButtonIndex = 0;
        this.playButton = this.add.image(400, 100, 'play').setInteractive();
        this.instructionsButton = this.add.image(400, 200, 'instructions').setInteractive();
        this.creditsButton = this.add.image(400, 300, 'credits').setInteractive();
        this.highScoresButton = this.add.image(400, 400, 'highScores').setInteractive();
        cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown', this.handleKeyboardInput, this);
        this.add.text(game.config.width/2, game.config.height - 30, 'Click Clack', menuConfig).setOrigin(0.5);
    }

    handleKeyboardInput() {
        if(cursors.up.isDown){
            this.selectedButtonIndex = (this.selectedButtonIndex - 1 + 4) % 4; // wrap around
        }else if(cursors.down.isDown) {
            this.selectedButtonIndex = (this.selectedButtonIndex + 1) % 4; // wrap around
        }
        // highlight the selected button
        this.highlightSelectedButton();
    }
    
    // function to highlight the selected button
    highlightSelectedButton(){
        [this.playButton, this.instructionsButton, this.creditsButton, this.highScoresButton].forEach((button, index) => {
            if(index === this.selectedButtonIndex){
                button.setTint(0xff0000);
            }else{
                button.clearTint();
            }
        });
    }
    
    update(){
        this.highlightSelectedButton();
        if(Phaser.Input.Keyboard.JustDown(cursors.right)){
            this.scene.start('playScene');
        }
    }
}
