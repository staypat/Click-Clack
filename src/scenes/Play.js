class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    create(){
        console.log("On Play Scene");
        // bgm

        // add background
        this.cameras.main.setBackgroundColor("#9FC2AA");

        // key bindings
        cursors = this.input.keyboard.createCursorKeys();
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

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


        function spawnDot(){
            if(this.dotsCount < this.maxDots){
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
                    this.dot = this.physics.add.sprite(this.cellCenterX, this.cellCenterY,  this.dotsArray[col][row].color);
                    this.dotsGroup.add(this.dot);
                    this.dotsCount++;
                    console.log("Current dotsCount value:", this.dotsCount);
                }
            }
        }

        // call spawnDot continuously to create random dot sprites until the grid is full
        this.time.addEvent({
            delay: 1000,
            callback: spawnDot,
            callbackScope: this,
            loop: true,
        });

        // player
        this.player = this.physics.add.sprite(this.startX + this.cellSize, this.startY + this.cellSize, 'player').setOrigin(0, 0);
        // player's current grid position (center is (0, 0))
        let playerGridX = 0;
        let playerGridY = 0;
        function movePlayer(direction){
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

        // keyboard listener
        this.input.keyboard.on('keydown', function (event){
            switch(event.code){
                case 'ArrowLeft':
                    console.log('Left')
                    movePlayer.call(this, 'LEFT');
                    break;
                case 'ArrowRight':
                    console.log('Right')
                    movePlayer.call(this, 'RIGHT');
                    break;
                case 'ArrowUp':
                    console.log('Up')
                    movePlayer.call(this, 'UP');
                    break;
                case 'ArrowDown':
                    console.log('Down')
                    movePlayer.call(this, 'DOWN');
                    break;
                default:
                    break;
            }
        }, this);

        // check dot and player intersection
        function checkOverlap() {
            this.dotsGroup.getChildren().forEach(dot => {
                if(Phaser.Geom.Intersects.RectangleToRectangle(dot.getBounds(), this.player.getBounds())){
                    console.log('Overlap detected with dot');
                    if(keyA.isDown && !(keyD.isDown)){
                        this.dotCol = Math.floor((dot.x - this.startX) / this.cellSize);
                        this.dotRow = Math.floor((dot.y - this.startY) / this.cellSize);
                        if(this.dotsArray[this.dotCol][this.dotRow].color == 'dotGreen'){
                            dot.destroy();
                            this.dotsArray[this.dotCol][this.dotRow].filled = false;
                            this.dotsCount--;
                        }
                    }
                    if(keyD.isDown && !(keyA.isDown)){
                        this.dotCol = Math.floor((dot.x - this.startX) / this.cellSize);
                        this.dotRow = Math.floor((dot.y - this.startY) / this.cellSize);
                        if(this.dotsArray[this.dotCol][this.dotRow].color == 'dotRed'){
                            dot.destroy();
                            this.dotsArray[this.dotCol][this.dotRow].filled = false;
                            this.dotsCount--;
                        }
                    }
                    if(keyD.isDown && keyA.isDown){
                        this.dotCol = Math.floor((dot.x - this.startX) / this.cellSize);
                        this.dotRow = Math.floor((dot.y - this.startY) / this.cellSize);
                        if(this.dotsArray[this.dotCol][this.dotRow].color == 'dotYellow'){
                            dot.destroy();
                            this.dotsArray[this.dotCol][this.dotRow].filled = false;
                            this.dotsCount--;
                        }
                    }
                }
            });
        }

        this.time.addEvent({
            loop: true,
            callback: checkOverlap,
            callbackScope: this,
            delay: 100
        });
    }

    update(){
        if(this.dotsCount >= this.maxDots){
            console.log("Grid is full, game over!");
            this.scene.start('menuScene');
        }
    }
}