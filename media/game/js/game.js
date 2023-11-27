import Scene1 from "./Scene1.js";






var config = {
    width: 430,
    height: 590,
    backgroundColor: 0x000000,
    scene: [Scene1],
    pixelArt: true,
    type: Phaser.AUTO,
    
    physics:{
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y: 0}
        }
    },
    scale:{
        // mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'phaser-game',
        zoom:2,
    }
    
}

var game = new Phaser.Game(config);


