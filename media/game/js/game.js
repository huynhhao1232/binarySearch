import Scene1 from "./Scene1.js";
import Preload from "./Preload.js";
import Intro from "./intro.js";




var config = {
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: [Preload, Intro, Scene1],
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

    }
    
}

var game = new Phaser.Game(config);


