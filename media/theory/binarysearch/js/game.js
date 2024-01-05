import Mainscene from "./mainscene.js"
const config ={
    type: Phaser.AUTO,
    width:800,
    height:600,
    backgroundColor:0xBDBFBF,
    scene:[Mainscene],
    scale:{
        parent:'Theory',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
       
    }
}
var game = new Phaser.Game(config)