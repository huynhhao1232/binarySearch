export default class Intro extends Phaser.Scene{
    constructor(){
        super('intro')
    }

    create()
    {
        const {width, height} = this.scale
        this.background = this.add.image(0, 0, 'background').setOrigin(0,0).setDepth(0)
        this.square = this.add.sprite(width/2, height/2 - 150, 'square', 2).setScale(14, 10)
        this.nameGame = this.add.text(this.square.x - 70, this.square.y - 70, 'Magic Card',{
            fontSize: '50px',
            fontFamily: 'Arial',
            align: 'center',
            color: 'white',
            wordWrap: {'width': this.square.width}
        })

        this.ruleDialog = this.add.sprite(width/2, height/2, 'dialog', 1).setDepth(4).setScale(5, 4.5).setVisible(false)
        this.ruleDialogText = this.add.text(this.ruleDialog.x- 230, this.ruleDialog.y-200, 'Em cần lật các thẻ bài theo cách của phương pháp tìm kiếm nhị phân để tìm ra con số cần tìm. Khi kích vào thẻ bài bất kì, số dưới thẻ bài đó sẽ được lật ra. Biết các số này được sắp xếp theo thứ tự tăng dần từ trái qua phải từ trên xuống dưới. Hãy tìm cách lật ít thẻ bài nhất có thể để tìm ra con số được yêu cầu.', {
            fontSize: '30px',
            fontFamily: 'Arial',
            align: 'justify',
            lineSpacing: 14,
            wordWrap: {'width': this.ruleDialog.width + 340},

        }).setDepth(4).setVisible(false)
        this.ruleDialogExit = this.add.sprite(this.ruleDialog.x - 250, this.ruleDialog.y - 250, 'square_small', 10).setDepth(4).setScale(4).setInteractive().setVisible(false)
        this.ruleDialogExit.on('pointerover', () => {
                this.ruleDialogExit.setFrame(11)
                this.ruleDialogExitText.setAlpha(0.8)
                this.ruleDialogExitText.y += 5
        }).on('pointerout', () => {
            this.ruleDialogExit.setFrame(10)
            this.ruleDialogExitText.setAlpha(1)
            this.ruleDialogExitText.y -= 5
        }).on('pointerdown', () => {
            this.ruleDialog.setVisible(false)
            this.ruleDialogExit.setVisible(false)
            this.ruleDialogExitText.setVisible(false)
            this.ruleDialogText.setVisible(false)
        })


        this.ruleDialogExitText = this.add.text(this.ruleDialogExit.x-10, this.ruleDialogExit.y- 18, 'X', {
            fontFamily:'Arial',
            fontSize: '29px',
            color: 'black'
        }).setDepth(4).setVisible(false)
        this.playButton = this.add.sprite(width/2, height/2 , 'button', 0).setScale(2).setInteractive().setDepth(1)

        this.playButton.on('pointerover', () => {
            this.playButton.setFrame(1)
            this.playText.setAlpha(0.8)
            this.playText.setScale(0.9)
            this.playText.y += 5
            this.playText.x += 5
        }).on('pointerout', () => {
            this.playButton.setFrame(0)
            this.playText.setAlpha(1).setScale(1)
            this.playText.y -= 5
            this.playText.x -= 5
        }).on('pointerdown', () => {
            this.scene.stop('intro')
            this.scene.start('Scene1')
        })

        this.playText = this.add.text(this.playButton.x - 40 , this.playButton.y - 20, 'PLAY', {
            fontFamily: 'Arial',
            fontSize: '35px',
            align: 'center'
        }).setDepth(1)

        this.ruleButton = this.add.sprite(width/2, height/2 + 80, 'button', 0).setScale(2).setInteractive().setDepth(1)

        this.ruleText = this.add.text(this.ruleButton.x - 40 , this.ruleButton.y - 20, 'RULE', {
            fontFamily: 'Arial',
            fontSize: '35px',
            align: 'center'
        }).setDepth(1)

        this.ruleButton.on('pointerover', () => {
            this.ruleButton.setFrame(1)
            this.ruleText.setAlpha(0.8)
            this.ruleText.setScale(0.9)
            this.ruleText.y += 5
            this.ruleText.x += 5
        }).on('pointerout', () => {
            this.ruleButton.setFrame(0)
            this.ruleText.setAlpha(1).setScale(1)
            this.ruleText.y -= 5
            this.ruleText.x -= 5
        }).on('pointerdown', () => {
            this.ruleDialog.setVisible(true)
            this.ruleDialogExit.setVisible(true)
            this.ruleDialogExitText.setVisible(true)
            this.ruleDialogText.setVisible(true)
        })
    }
}