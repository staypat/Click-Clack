class Instructions extends Phaser.Scene{
    constructor(){
        super("instructionScene");
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
        this.add.image(150, 150, 'player')
        this.add.image(150, 250, 'dotGreen').setScale(2);
        this.add.image(150, 350, 'dotRed').setScale(2);
        this.add.image(150, 450, 'dotYellow').setScale(2);
        this.add.image(348, 250, 'blankbutton');
        this.add.image(348, 350, 'blankbutton');
        this.add.image(348, 450, 'blankbutton');
        this.add.image(438, 450, 'blankbutton');
        this.add.bitmapText(50, 20, 'klein', 'Objective: Clear the dots while the square is over a dot.\n                   Don\'t let the board fill up with dots!').setScale(0.35);
        this.add.bitmapText(230, 140, 'klein', 'Control the square using arrow keys.\n').setScale(0.35);
        this.add.bitmapText(230, 235, 'klein', 'Press      A   to clear green dots.').setScale(0.35);
        this.add.bitmapText(230, 335, 'klein', 'Press      D   to clear red dots.').setScale(0.35);
        this.add.bitmapText(230, 435, 'klein', 'Press      A    +    D   to clear yellow dots.').setScale(0.35);
        this.add.image(40, game.config.height - 40, 'button').setScale(1.5).setAngle(180);
        this.add.bitmapText(90, game.config.height - 50, 'klein', 'to go back to menu').setScale(0.4);
    }
    update(){
        if(cursors.left.isDown){
            this.menuBgm.stop();
            this.scene.start('menuScene');
        }
    }
}