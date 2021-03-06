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
    this.isTerminating = false
}

gameScene.create = function () {
    this.bg = this.add.sprite(0, 0, "background")
        .setOrigin(0,0)

    this.player = this.add.sprite(40, 180, 'player')
        .setScale(.5)

    this.goal = this.add.sprite(config.width - 80, config.height/2, 'treasure')
        .setScale(.5)


        this.enemies = this.add.group( {
            key: 'enemy',
            repeat: 4,
            setXY: {
                x: 100,
                y: 100,
                stepX: 100,
                stepY: 20
            }
        })

    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5)

    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
        enemy.flipX = true
        let direction = Math.random() < 0.5? 1 : -1
        let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed)
        enemy.speed = direction * speed

    }, this)

};

gameScene.update = function() {
    if(this.isTerminating) return

    if(this.input.activePointer.isDown) {
        this.player.x += this.playerSpeed
    }

    let playerRect = this.player.getBounds()
    let goalRect = this.goal.getBounds()

    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
        console.log('Win')
        return this.gameOver()
    }
    
    let enemies = this.enemies.getChildren()
    // Returns an array of the Enemies

    for (let i=0; i< enemies.length; i++) {
        enemies[i].y += enemies[i].speed

        let conditionUp = enemies[i].y <= this.enemyMinY
        let conditionDown = enemies[i].y >= this.enemyMaxY

        if (conditionUp || conditionDown) {
            enemies[i].speed *= -1
        }
        
        let enemyRect = enemies[i].getBounds()
        if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
            console.log('Hit. Restarting!')
            return this.gameOver()

            
        }

    }

}


gameScene.gameOver = function() {

    this.cameras.main.shake(500, .01)
    this.isTerminating = true

    this.cameras.main.on('camerashakecomplete', function() {

        this.cameras.main.fade(200)
     
    }, this )

    this.cameras.main.on('camerafadeoutcomplete', function() {
        this.isTerminating = false

        return this.scene.restart()
    }, this )

}

let config = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: 640,
    height: 360,
    scene: gameScene,
};

let game = new Phaser.Game(config);
