import CountdownController from "./CountdownCotroller.js";

export default class Scene1 extends Phaser.Scene {
    constructor() {
        super('Scene1');
        this.cards = [];
    }

    preload() {
        this.load.image('background', '../game/assets/img/background.jpg');
        this.load.image('oldcard', '../game/assets/img/cards.jpg');
        this.load.image('newcard', '../game/assets/img/newcard.jpg');
    }

    create() {
        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;
        this.background = this.add.sprite(0, 0, 'background').setOrigin(0, 0);
        this.background.displayWidth = screenWidth;
        this.background.displayHeight = screenHeight;
        this.array = []
        this.setTime = 5000
        const numberOfRows = 3;
        const imagesPerRow = 5;
        const horizontalSpacing = 20;
        const verticalSpacing = 30;

        const oldImageTexture = 'oldcard';
        const newImageTexture = 'newcard';
        const imageWidth = this.textures.getFrame(newImageTexture).width;
        const imageHeight = this.textures.getFrame(newImageTexture).height;

		const timerLabel = this.add.text(screenWidth * 0.5, 50, this.setTime / 1000, { fontSize: 48 })
			.setOrigin(0.5)

		this.countdown = new CountdownController(this, timerLabel)

        
        console.log(this.countdown)
        const startX = (screenWidth - (imagesPerRow * (imageWidth + horizontalSpacing) - horizontalSpacing)) / 2;
        const startY = (screenHeight - (numberOfRows * (imageHeight + verticalSpacing) - verticalSpacing)) / 2;
        this.generateRandomNumber(numberOfRows, imagesPerRow);
        console.log(this.array)
        let i = 0;
        for (let row = 0; row < numberOfRows; row++) {
            for (let col = 0; col < imagesPerRow; col++) {
                const x = startX + col * (imageWidth + horizontalSpacing);
                const y = startY + row * (imageHeight + verticalSpacing);

                const card = this.add.sprite(x, y, oldImageTexture);
                card.setOrigin(0, 0);
                card.setInteractive();

                card.setData('x',i)
                // Thêm sự kiện khi nhấp vào thẻ
                card.on('pointerdown', () => {
                    // Tạo số ngẫu nhiên mới và cập nhật lên ảnh
                    let x = card.getData('x')
                    let newNumber = this.array[x];
                    card.setTexture(newImageTexture);
                    card.setData('number', newNumber);
                    this.updateNumberText(card);
                    if(newNumber === this.number)
                    {
                        this.check = true
                    }
                });
                i++
                this.cards.push(card);
            }
        }
        this.number = this.array[Math.floor(Math.random() * (numberOfRows * imagesPerRow))]
        this.createDialog(this.number)



    }

    handleCountdownFinished(){
        this.label = this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 50, "You Lose!", {
            fontSize: '32px',
            color: 'white',
            fontFamily: 'Arial',
            wordWrap: { width: this.game.config.width }
        }).setOrigin(0.5, 0.5).setDepth(11);
        this.overlay = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000, 0);
        this.overlay.setOrigin(0, 0).setInteractive();
    }



    async createDialog(number) {
        this.check = false
        this.overlay = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000, 0);
        this.overlay.setOrigin(0, 0).setInteractive();
        // Tạo nền cho hộp thoại
        const dialogBackground = this.add.rectangle(this.game.config.width / 2, this.game.config.height / 2, this.game.config.width - 50, this.game.config.height/2 - 100, 0xffffff);
        dialogBackground.setStrokeStyle(2, 0x000000).setDepth(11);

        // Thêm văn bản hỏi
        // Đoạn 1
        const questionText1 = this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 35, `Số bạn cần phải tìm là: ${number}`, {
            fontSize: '15px',
            color: 'black',
            wordWrap: { width: 350 }
        }).setOrigin(0.5, 0.5).setDepth(11);

        const yesButton = this.add.text(this.game.config.width / 2 - 65, this.game.config.height / 2 + 20, "Bắt đầu", {
            fontSize: '20px',
            backgroundColor: '#00ff00',
            fontWeight: '700',
            padding: { left: 20, right: 20, top: 5, bottom: 5 }
        }).setInteractive().setDepth(11);

        this.dialog = {
            background: dialogBackground,
            text: questionText1,
            yesbutton: yesButton,
        }

        yesButton.on('pointerdown', async () => {

            this.hideDialog()
            this.overlay.destroy()
            this.countdown.start(this.handleCountdownFinished.bind(this), this.setTime)
            

        })







        // Lưu lại các đối tượng để sau này có thể sử dụng

    }

    hideDialog() {
        this.dialog.background.destroy()
        this.dialog.text.destroy()
        this.dialog.yesbutton.destroy()
    }

    generateRandomNumber(n,m) {
        for(let i=0; i< n * m; i++){
            this.array[i] = Math.floor(Math.random() * 100); // Số ngẫu nhiên từ 0 đến 99
        }
        this.array.sort((a, b) => a - b);
    }

    updateNumberText(card) {
        const numberText = this.add.text(card.x + card.width / 2, card.y + card.height / 2, card.getData('number'), {
            fontSize: '32px',
            fill: '#000000',
        });
        numberText.setOrigin(0.5);
        this.add.existing(numberText);
    }

    displayNumbers() {
        for (let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i];
            const number = this.generateRandomNumber();
            card.setData('number', number);
            this.updateNumberText(card);
        }
    }

    update(){
        this.countdown.update()

        if(this.check)
        {
            this.countdown.stop()
            this.label = this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 50, "You Win!", {
                fontSize: '32px',
                color: 'white',
                fontFamily: 'Arial',
                wordWrap: { width: this.game.config.width }
            }).setOrigin(0.5, 0.5).setDepth(11);
            this.overlay = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000, 0);
            this.overlay.setOrigin(0, 0).setInteractive();
            
        }
    }
}

