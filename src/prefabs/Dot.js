class Dot extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, color){
        super(scene, x, y, color);
        scene.add.existing(this);
        this.parentScene = scene;
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.setImmovable();
    }
}