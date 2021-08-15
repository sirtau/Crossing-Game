import Phaser from "phaser";

let gameScene = new Phaser.Scene("Game");

gameScene.preload = function () {
    this.load.image("background", "../assets/background.png");
    this.load.image("enemy", "../assets/dragon.png");
    this.load.image("player", "../assets/player.png");
    this.load.image("treasure", "../assets/treasure.png");
};


gameScene.init = function() {
    this.playerSpeed = 2
}

gameScene.create = function () {
    this.bg = this.add.sprite(0, 0, "background")
        .setOrigin(0,0)

    this.player = this.add.sprite(40, 180, 'player')
        .setScale(.5)

    this.goal = this.add.sprite(config.width - 80, config.height/2, 'treasure')
        .setScale(.5)

    this.enemy1 = this.add.sprite(250, 180, 'enemy')
        .setScale(.5)

    this.enemy2 = this.add.sprite(450, 180, 'enemy')
        .setScale(.5)
    
};

gameScene.update = function() {

    if(this.input.activePointer.isDown) {
        this.player.x += this.playerSpeed
    }


    let playerRect = this.player.getBounds()
    let goalRect = this.goal.getBounds()


    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
        this.scene.restart()
    }
    
    

}

let config = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: 640,
    height: 360,
    scene: gameScene,
};

let game = new Phaser.Game(config);
