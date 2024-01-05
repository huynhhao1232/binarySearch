

export default class Rectangle extends Phaser.GameObjects.Container{
    constructor(data) {
        let{scene, x, y, width, height, value, depth} = data
        // Tạo và thêm hình chữ nhật vào container
        let rectangle = new Phaser.GameObjects.Rectangle(scene, -20, -80, width, height, 0xadd8e6).setOrigin(0)
        let rectangleHeight = ""
        if(value < 10)
        {
            rectangleHeight = new Phaser.GameObjects.Text(scene, -10, -100, value, {color: 'black', fontFamily: 'Arial'}).setOrigin(0)
        }
        else{
            rectangleHeight = new Phaser.GameObjects.Text(scene, -14, -100, value, {color: 'black', fontFamily: 'Arial'}).setOrigin(0)
        }
        
        super(scene,x,y, [rectangle, rectangleHeight]);

        // Lưu trữ các thông tin quan trọng
        this.rectangle = rectangle;
        this.rectangleHeight = rectangleHeight
        this.scene = scene;
        this.depth = depth
        // Thêm container vào scene
        this.scene.add.existing(this);
    }

    changeColor(newColor) {
        this.rectangle.setFillStyle(newColor);
    }
    
}