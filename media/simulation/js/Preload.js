export default class Preload extends Phaser.Scene{
    constructor()
    {
        super('preload')
    }

    preload()
    {
        this.load.image('background', 'assets/img/background.png');
        this.load.image('oldcard', 'assets/img/oldcard.png');
        this.load.image('newcard', 'assets/img/newcard.png');
        this.load.image('dialog_box', 'assets/img/dialog box big.png')
        this.load.spritesheet('square', 'assets/img/Square Buttons 26x19.png', {
            frameWidth: 48,
            frameHeight: 32
        })
        this.load.spritesheet('button', 'assets/img/UI Big Play Button.png', {
            frameWidth: 96,
            frameHeight: 32
        })
        this.load.spritesheet('dialog', 'assets/img/Setting menu.png', {
            frameWidth: 128,
            frameHeight: 144
        })
        this.load.spritesheet('square_small', 'assets/img/Small Square Buttons.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.image('play', 'assets/img/play.png')
        this.load.image('back', 'assets/img/back.png')

    }

    create()
    {
        this.scene.start('BubbleSortVisualization')
    }
}