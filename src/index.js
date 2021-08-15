import Phaser from "phaser";

let gameScene = new Phaser.Scene("Game");

gameScene.preload = function () {
    this.load.image("background", "../assets/background.png");
    this.load.image("enemy", "../assets/dragon.png");
    this.load.image("player", "../assets/player.png");
    this.load.image("treasure", "../assets/treasure.png");
};


gameScene.init = function() {
    this.playerSpeed = 3

    this.enemySpeed = 3
    this.enemyMinY = 80
    this.enemyMaxY = 280
    this.enemyMinSpeed = 1
    this.enemyMaxSpeed = 4
}

gameScene.create = function () {
    this.bg = this.add.sprite(0, 0, "background")
        .setOrigin(0,0)

    this.player = this.add.sprite(40, 180, 'player')
        .setScale(.5)

    this.goal = this.add.sprite(config.width - 80, config.height/2, 'treasure')
        .setScale(.5)

    this.enemy = this.add.sprite(250, 180, 'enemy')
        .setScale(.5)        
    this.enemy.flipX = true

    let direction = Math.random() < 0.5? 1 : -1
    let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed)
    this.enemySpeed = direction * speed

    
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
    


    this.enemy.y += this.enemySpeed

    if (this.enemy.y <= this.enemyMinY || this.enemy.y >= this.enemyMaxY) {
        this.enemySpeed *= -1
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
