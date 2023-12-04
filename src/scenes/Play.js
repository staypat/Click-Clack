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
                        if(!(this.dotsArray[i][j])){
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
                    this.dot = this.add.sprite(this.cellCenterX, this.cellCenterY, this.dotColors[this.rndSelection]);
                    this.dotsGroup.add(this.dot);
                    this.dotsArray[col][row] = true;
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
            repeat: this.maxDots - 1
        });
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(cursors.up)){
            console.log("Up Key Pressed");
        }
        if(this.dotsCount >= this.maxDots){
            console.log("Grid is full, game over!");
            this.scene.start('menuScene');
        }
    }
}