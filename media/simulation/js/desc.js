

export default class Desc extends Phaser.GameObjects.Container{
    constructor(data) {
        let{scene, x, y, value, frame} = data
        // Tạo và thêm hình chữ nhật vào container
        let playButton = new Phaser.GameObjects.Sprite(scene, 0, 0, frame, 0).setOrigin(0).setScale(4,3)
        let rectangleHeight = new Phaser.GameObjects.Text(scene, 18, 13, value, {color: 'black', fontFamily: 'Arial', fontSize: '25px', wordWrap: {width: 360}}).setOrigin(0)
        super(scene,x,y, [playButton, rectangleHeight]);

        // Lưu trữ các thông tin quan trọng

        // Thêm container vào scene
        this.scene.add.existing(this);
        this.playButton = playButton
    }


    
}