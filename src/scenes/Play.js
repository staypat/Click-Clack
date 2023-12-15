class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    create(){
        // bgm
        this.bgm = this.sound.add('bgm', { 
            mute: false,
            volume: 0.3,
            rate: 1,
            loop: true 
        });
        this.bgm.play();

        // add background
        this.cameras.main.setBackgroundColor("#9FC2AA");
        this.add.rectangle(0, 0, game.config.width, game.config.height / 5, 0xC87F96).setOrigin(0, 0);

        // key bindings
        cursors = this.input.keyboard.createCursorKeys();
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // dots and grid set up
        this.dotsGroup = this.add.group();
        this.gridColumns = 3; // number of columns in the grid
        this.gridRows = 3; // number of rows in the grid
        this.dotsCount = 0; // counter for the number of dots spawned
        this.maxDots = this.gridColumns * this.gridRows; // maximum number of dots allowed (one per cell)
        this.dotsArray = [];
        for(let i = 0; i < this.gridColumns; i++){
            this.dotsArray[i] = [];
            for(let j = 0; j < this.gridRows; j++){
                this.dotsArray[i][j] = false; // set all cells to initially empty (false)
            }
        }

        this.cellSize = 100;

        // starting positions to center the board
        this.startX = (this.game.config.width - 3 * this.cellSize) / 2;
        this.startY = (this.game.config.height - 3 * this.cellSize) / 2;

        this.grid = this.add.graphics();
        // horizontal lines
        for(let i = 1; i < 3; i++){
            this.y = this.startY + i * this.cellSize;
            this.grid.lineStyle(6, 0xffffff);
            this.grid.strokeLineShape(new Phaser.Geom.Line(this.startX, this.y, this.startX + 3 * this.cellSize, this.y));
        }

        // vertical lines
        for(let j = 1; j < 3; j++){
            this.x = this.startX + j * this.cellSize;
            this.grid.lineStyle(6, 0xffffff);
            this.grid.strokeLineShape(new Phaser.Geom.Line(this.x, this.startY, this.x, this.startY + 3 * this.cellSize));
        }


        // call spawnDot continuously to create random dot sprites until the grid is full
        // first spawn
        this.MAX_DELAY = 980;
        this.time.addEvent({
            delay: 1000,
            callback: this.spawnDot,
            callbackScope: this,
            loop: false,
        });

        this.spawns = this.time.addEvent({
            delay: 3000,
            callback: this.spawnDot,
            callbackScope: this,
            loop: true,
        });

        // player
        this.player = this.add.sprite(this.startX + this.cellSize, this.startY + this.cellSize, 'player').setOrigin(0, 0);
        this.player.gameOver = false;
        // player's current grid position (center is (0, 0))
        let playerGridX = 0;
        let playerGridY = 0;
        function movePlayer(direction){
            if(!this.player.gameOver){
                // new grid position
                let newGridX = playerGridX;
                let newGridY = playerGridY;
                if(direction === 'LEFT' && playerGridX > -1){
                    newGridX--;
                }else if(direction === 'RIGHT' && playerGridX < this.gridColumns - 2){
                    newGridX++;
                }else if(direction === 'UP' && playerGridY > -1){
                    newGridY--;
                }else if(direction === 'DOWN' && playerGridY < this.gridRows - 2){
                    newGridY++;
                }
                // update player position if valid new grid position
                if(newGridX != playerGridX || newGridY != playerGridY){
                    playerGridX = newGridX;
                    playerGridY = newGridY;
                    const newX = this.startX + newGridX * this.cellSize + this.cellSize;
                    const newY = this.startY + newGridY * this.cellSize + this.cellSize;
                    this.tweens.add({
                        targets: this.player,
                        x: newX,
                        y: newY,
                        duration: 75,
                        ease: 'Linear',
                    });
                }
            }
        }

        // keyboard listener
        this.input.keyboard.on('keydown', function (event){
            switch(event.code){
                case 'ArrowLeft':
                    movePlayer.call(this, 'LEFT');
                    break;
                case 'ArrowRight':
                    movePlayer.call(this, 'RIGHT');
                    break;
                case 'ArrowUp':
                    movePlayer.call(this, 'UP');
                    break;
                case 'ArrowDown':
                    movePlayer.call(this, 'DOWN');
                    break;
                default:
                    break;
            }
        }, this);

        // check dot and player intersection
        this.time.addEvent({
            loop: true,
            callback: this.checkOverlap,
            callbackScope: this,
            delay: 100
        });

        // time, score, combo tracker
        this.timeLeft = 60;
        this.currScore = 0;
        this.combo = 0;
        this.add.image(game.config.width/2 - 260, game.config.height/10 + 20, 'blankbutton').setScale(6, 1);
        this.add.image(game.config.width/2, game.config.height/10 + 20, 'blankbutton').setScale(4, 1);
        this.add.image(game.config.width/2 + 260, game.config.height/10 + 20, 'blankbutton').setScale(6, 1);
        this.add.image(game.config.width/2 - 330, game.config.height - 60, 'dotGreen').setScale(2);
        this.add.image(game.config.width/2 - 70, game.config.height - 60, 'dotRed').setScale(2);
        this.add.image(game.config.width/2 + 190, game.config.height - 60, 'dotYellow').setScale(2);
        this.add.image(game.config.width/2 - 240, game.config.height - 60, 'blankbutton');
        this.add.image(game.config.width/2 + 20, game.config.height - 60, 'blankbutton');
        this.add.image(game.config.width/2 + 270, game.config.height - 60, 'blankbutton');
        this.add.image(game.config.width/2 + 360, game.config.height - 60, 'blankbutton');
        this.add.bitmapText(game.config.width/2 - 253, game.config.height - 80, 'klein', 'A').setScale(0.5);
        this.add.bitmapText(game.config.width/2 + 7, game.config.height - 80, 'klein', 'D').setScale(0.5);
        this.add.bitmapText(game.config.width/2 + 257, game.config.height - 80, 'klein', 'A  +').setScale(0.5);
        this.add.bitmapText(game.config.width/2 + 347, game.config.height - 80, 'klein', 'D').setScale(0.5);
        this.add.bitmapText(game.config.width/2 - 380, game.config.height/10, 'klein', 'Score:').setScale(0.5);
        this.add.bitmapText(game.config.width/2 - 70, game.config.height/10, 'klein', 'Time:').setScale(0.5);
        this.add.bitmapText(game.config.width/2 + 140, game.config.height/10, 'klein', 'Combo:').setScale(0.5);
        this.timeText = this.add.text(game.config.width/2 + 30, game.config.height/9, this.timeLeft).setColor('black').setScale(2);
        this.scoreText = this.add.text(game.config.width/2 - 265, game.config.height/9, this.currScore).setColor('black').setScale(2).setAlign('left');
        this.comboText = this.add.text(game.config.width/2 + 285, game.config.height/9, this.combo).setColor('black').setScale(2).setAlign('left');
        this.countdownTimer = this.time.addEvent({
            delay: 1000,
            callback: this.updateLevel,
            callbackScope: this,
            loop: true
        });
    }

    update(){
        // game over effects
        if((this.dotsCount >= this.maxDots || this.timeLeft == 0) && !this.player.gameOver){
            this.player.gameOver = true;
            this.dotEmitter = this.add.particles(game.config.width/2, game.config.height/2, 'dotYellow', {
                angle: { min: 180, max: 360 },
                speed: { min: 10, max: 500, steps: 5000 },
                gravityY: 350,
                lifespan: 2000,
                quantity: 10,
                scale: { start: 0.1, end: 2 },
                tint: [0xff0000, 0x00ff00, 0xffff00],
            });
            this.time.delayedCall(2000, () => {
                this.dotEmitter.stop();
                this.add.image(game.config.width/2, game.config.height/2, 'blankbutton').setScale(15,3);
                this.add.bitmapText(game.config.width/2 - 85, game.config.height/2 - 72, 'klein', "Game Over").setScale(0.4);
                this.add.bitmapText(game.config.width/2 - 100, game.config.height/2 - 40, 'klein', 'Best Score: ').setScale(0.4);
                this.add.bitmapText(game.config.width/2 - 115, game.config.height/2 - 10, 'klein', 'Press R to restart').setScale(0.4);
                this.add.image(game.config.width/2 - 95, game.config.height/2 + 35, 'button').setScale(0.6).setAngle(180);
                this.add.bitmapText(game.config.width/2 - 190, game.config.height/2 + 20, 'klein', 'Press     to go back to menu').setScale(0.4);
                this.highScoreText = this.add.text(game.config.width/3 + 200, game.config.height/3 + 62, highScoreVal).setColor('black').setScale(2);
            }, [], this);
        }
        if(this.player.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.bgm.stop();
            this.scene.restart();
        }
        if(this.player.gameOver && Phaser.Input.Keyboard.JustDown(cursors.left)){
            this.bgm.stop();
            this.scene.start('menuScene');
        }
    }

    // spawn dot function (used in timer callback)
    spawnDot(){
        if(this.dotsCount < this.maxDots && !this.player.gameOver){
            this.emptyCells = [];
            for(let i = 0; i < this.gridColumns; i++){
                for(let j = 0; j < this.gridRows; j++){
                    if(!(this.dotsArray[i][j].filled)){
                        this.emptyCells.push({ col: i, row: j });
                    }
                }
            }
            if(this.emptyCells.length > 0){
                this.randomIndex = Phaser.Math.Between(0, this.emptyCells.length - 1);
                const {col, row} = this.emptyCells[this.randomIndex];
                this.cellCenterX = this.startX + col * this.cellSize + this.cellSize / 2;
                this.cellCenterY = this.startY + row * this.cellSize + this.cellSize / 2;
                this.dotColors = ['dotRed', 'dotGreen', 'dotYellow'];
                this.rndSelection = Math.floor(Math.random() * this.dotColors.length);
                this.dotsArray[col][row] = {
                    filled: true,
                    color: this.dotColors[this.rndSelection]
                };
                this.dot = new Dot(this, this.cellCenterX, this.cellCenterY,  this.dotsArray[col][row].color);
                this.dotsGroup.add(this.dot);
                this.dotsCount++;
            }
        }
    }

    // dot and player overlap check along with input check
    checkOverlap() {
        this.dotsGroup.getChildren().forEach(dot => {
            if(!this.player.gameOver){
                if(Phaser.Geom.Intersects.RectangleToRectangle(dot.getBounds(), this.player.getBounds())){
                    if(keyA.isDown && !(keyD.isDown)){
                        this.sound.play('click', {volume: 0.5});
                        this.dotCol = Math.floor((dot.x - this.startX) / this.cellSize);
                        this.dotRow = Math.floor((dot.y - this.startY) / this.cellSize);
                        if(this.dotsArray[this.dotCol][this.dotRow].color == 'dotGreen'){
                            let pop = this.add.sprite(dot.x - 15, dot.y - 15, 'green').setOrigin(0, 0);
                            pop.anims.play('green');
                            pop.on('animationcomplete', () => {
                                pop.destroy();
                            }); 
                            dot.destroy();
                            this.combo++;
                            this.comboText.setText(this.combo);
                            this.currScore += this.combo * 5;
                            this.scoreText.setText(this.currScore);
                            this.dotsArray[this.dotCol][this.dotRow].filled = false;
                            this.dotsCount--;
                        }else{
                            this.cameras.main.shake(50, 0.01);
                            this.combo = 0;
                            this.comboText.setText(this.combo);
                        }
                    }
                    if(keyD.isDown && !(keyA.isDown)){
                        this.sound.play('clack', {volume: 0.5});
                        this.dotCol = Math.floor((dot.x - this.startX) / this.cellSize);
                        this.dotRow = Math.floor((dot.y - this.startY) / this.cellSize);
                        if(this.dotsArray[this.dotCol][this.dotRow].color == 'dotRed'){
                            let pop = this.add.sprite(dot.x - 15, dot.y - 15, 'red').setOrigin(0, 0);
                            pop.anims.play('red');
                            pop.on('animationcomplete', () => {
                                pop.destroy();
                            }); 
                            dot.destroy();
                            this.combo++;
                            this.comboText.setText(this.combo);
                            this.currScore += this.combo * 5;
                            this.scoreText.setText(this.currScore);
                            this.dotsArray[this.dotCol][this.dotRow].filled = false;
                            this.dotsCount--;
                        }else{
                            this.cameras.main.shake(50, 0.01);
                            this.combo = 0;
                            this.comboText.setText(this.combo);
                        }
                    }
                    if(keyD.isDown && keyA.isDown){
                        this.sound.play('click', {volume: 0.5});
                        this.sound.play('clack', {volume: 0.5});
                        this.dotCol = Math.floor((dot.x - this.startX) / this.cellSize);
                        this.dotRow = Math.floor((dot.y - this.startY) / this.cellSize);
                        if(this.dotsArray[this.dotCol][this.dotRow].color == 'dotYellow'){
                            let pop = this.add.sprite(dot.x - 15, dot.y - 15, 'yellow').setOrigin(0, 0);
                            pop.anims.play('yellow');
                            pop.on('animationcomplete', () => {
                                pop.destroy();
                            }); 
                            dot.destroy();
                            this.combo++;
                            this.comboText.setText(this.combo);
                            this.currScore += this.combo * 10;
                            this.scoreText.setText(this.currScore);
                            this.dotsArray[this.dotCol][this.dotRow].filled = false;
                            this.dotsCount--;
                        }else{
                            this.cameras.main.shake(50, 0.01);
                            this.combo = 0;
                            this.comboText.setText(this.combo);
                        }
                    }
                }
            }
        });
    }

    // level difficulty increase
    updateLevel(){
        if(!this.player.gameOver){
            this.timeLeft -= 1;
            this.timeText.setText(this.timeLeft);
            if(highScoreVal <= this.currScore){
                highScoreVal = this.currScore;
            }
            if((this.timeLeft % 5) == 0){
                if(this.spawns.delay > this.MAX_DELAY){
                    this.spawns.delay -= 400;
                }
            }
        }
    }
}