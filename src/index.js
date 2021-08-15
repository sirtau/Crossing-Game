import Phaser from "phaser";

let gameScene = new Phaser.Scene("Game");

gameScene.preload = function () {
    this.load.image("background", "../assets/background.png");
    this.load.image("dragon", "../assets/dragon.png");
    this.load.image("player", "../assets/player.png");
    this.load.image("treasure", "../assets/treasure.png");
};

gameScene.create = function () {
    let bg = this.add.sprite(0, 0, "background");
    bg.setOrigin(0,0)
    let player = this.add.sprite(70, 180, 'player');

    
    let gameW = this.sys.game.config.width
    let gameH = this.sys.game.config.height
};

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene,
};

let game = new Phaser.Game(config);
