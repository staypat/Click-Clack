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
            for (let j = 0; j < this.gridRows; j++) {
                this.dotsArray[i][j] = false; // set all cells to initially empty (false)
            }
        }
        const cellSize = 100;

        // starting positions to center the board
        const startX = (this.game.config.width - 3 * cellSize) / 2;
        const startY = (this.game.config.height - 3 * cellSize) / 2;

        const graphics = this.add.graphics();

        // horizontal lines
        for(let i = 1; i < 3; i++){
            const y = startY + i * cellSize;
            graphics.lineStyle(6, 0xffffff);
            graphics.strokeLineShape(new Phaser.Geom.Line(startX, y, startX + 3 * cellSize, y));
        }

        // vertical lines
        for(let j = 1; j < 3; j++){
            const x = startX + j * cellSize;
            graphics.lineStyle(6, 0xffffff);
            graphics.strokeLineShape(new Phaser.Geom.Line(x, startY, x, startY + 3 * cellSize));
        }


        function spawnDot(){
            if(this.dotsCount < this.maxDots){
                let emptyCells = [];
                for(let i = 0; i < this.gridColumns; i++){
                    for(let j = 0; j < this.gridRows; j++){
                        if(!(this.dotsArray[i][j])){
                            emptyCells.push({ col: i, row: j });
                        }
                    }
                }
                if(emptyCells.length > 0){
                    const randomIndex = Phaser.Math.Between(0, emptyCells.length - 1);
                    const { col, row } = emptyCells[randomIndex];
                    const cellCenterX = startX + col * cellSize + cellSize / 2;
                    const cellCenterY = startY + row * cellSize + cellSize / 2;
                    const dotColors = ['dotRed', 'dotGreen', 'dotYellow'];
                    const rndSelection = Math.floor(Math.random() * dotColors.length);
                    const dot = this.add.sprite(cellCenterX, cellCenterY, dotColors[rndSelection]);
                    this.dotsGroup.add(dot);
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
            this.scene.restart('menuScene');
        }
    }
}