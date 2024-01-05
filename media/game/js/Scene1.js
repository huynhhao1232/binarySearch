import CountdownController from "./CountdownCotroller.js";

export default class Scene1 extends Phaser.Scene {
    constructor() {
        super('Scene1');
        this.cards = [];
    }

    create() {
        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;
        this.background = this.add.sprite(0, 0, 'background').setOrigin(0, 0);

        this.array = []
        this.textCards = []
        this.setTime = 5000
        this.numberOfRows = 2;
        this.imagesPerRow = 7;





        this.count = 0
        this.step = 0
       
		//this.countdown = new CountdownController(this, timerLabel)

        
        //console.log(this.countdown)




        this.createDialog2(this.numberOfRows, this.imagesPerRow)

    }

    createCard(numberOfRows, imagesPerRow, startX, startY, horizontalSpacing, verticalSpacing, imageWidth, imageHeight, oldImageTexture, newImageTexture)
    {
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
                    // Tạo số ngẫu nhßiên mới và cập nhật lên ảnh
                    this.count++
                    this.timerLabel.text = this.count
                    card.off('pointerdown')
                    let x = card.getData('x')

                    let newNumber = this.array[x];
                    card.setTexture(newImageTexture);
                    card.setData('number', newNumber);
                    this.updateNumberText(card);
                    if(newNumber === this.number)
                    {
                        this.check = true
                    }
                    else
                    {
                        if(this.count == this.step && !this.check)
                        {
                            this.lose()
                        }
                        
                        if(this.number > newNumber)
                        {
                            for(let i = 0; i < x; i++)
                            {
                                this.cards[i].off('pointerdown')
                                this.cards[i].setAlpha(0.5)
                            }
                        }
                        else if(this.number < newNumber)
                        {
                            for(let i = this.cards.length - 1; i > x; i--)
                            {
                                this.cards[i].off('pointerdown')
                                this.cards[i].setAlpha(0.5)
                            }
                        }
                    }
                });
                i++
                this.cards.push(card);
            }
        }
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



    createDialog(number) {
        this.check = false
        
        // this.overlay = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000, 0);
        // this.overlay.setOrigin(0, 0).setInteractive();
        // // Tạo nền cho hộp thoại
        // const dialogBackground = this.add.rectangle(this.game.config.width / 2, this.game.config.height / 2, this.game.config.width - 50, this.game.config.height/2 - 100, 0xffffff);
        // dialogBackground.setStrokeStyle(2, 0x000000).setDepth(11);
        const{width, height} = this.scale
        this.dialog1 = this.add.image(width/2, height - 35, 'dialog_box').setScale(2, 2)
        this.dialogText1 = this.add.text(this.dialog1.x -100, this.dialog1.y- 10, `Số cần tìm là: ${number}`,{
            fontFamily: 'Arial',
            fontSize: '25px'
        })
    }

    createDialog2(numberOfRows, imagesPerRow)
    {
        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;
        this.background.displayWidth = screenWidth;
        this.background.displayHeight = screenHeight;
        const horizontalSpacing = 20;
        const verticalSpacing = 30;
        const oldImageTexture = 'oldcard';
        const newImageTexture = 'newcard';
        const imageWidth = this.textures.getFrame(newImageTexture).width;
        const imageHeight = this.textures.getFrame(newImageTexture).height;
        const startX = (screenWidth - (this.imagesPerRow * (imageWidth + horizontalSpacing) - horizontalSpacing)) / 2;
        const startY = (screenHeight - (this.numberOfRows * (imageHeight + verticalSpacing) - verticalSpacing)) / 2;
        this.check = false
        const{width, height} = this.scale
        const count = Math.ceil(Math.log2(numberOfRows*imagesPerRow))
        this.step = count
        const dialog = this.add.sprite(width/2, height/2, 'dialog', 0).setDepth(4).setScale(3)
        const cardNumber = this.add.text(dialog.x - 140, dialog.y - 60, `Số thẻ bài: ${numberOfRows*imagesPerRow}`,{
            fontFamily: 'Arial',
            fontSize: '30px'
        }).setDepth(4)

        const step = this.add.text(dialog.x - 140, dialog.y, `Số bước tối đa: ${count}`,{
            fontFamily: 'Arial',
            fontSize: '30px',
            color: 'red'
        }).setDepth(4)

        let dk = ''
        if(numberOfRows == 1)
        {
            dk = 'Dễ'
        }
        else if(numberOfRows == 2 || numberOfRows == 3)
        {
            dk = 'Trung bình'
        }
        else
        {
            dk = 'Khó'
        }
        const hard = this.add.text(dialog.x - 140, dialog.y + 60, `Độ khó: ${dk}`,{
            fontFamily: 'Arial',
            fontSize: '30px',
            color: 'red'
        }).setDepth(4)

        const button = this.add.sprite(dialog.x , dialog.y + 140, 'button', 0).setDepth(4).setScale(1.8).setInteractive()

        const buttonText = this.add.text(button.x - 50 , button.y -18, 'Bắt đầu',{
            fontFamily: 'Arial',
            fontSize: '30px',

        }).setDepth(4)

        button.on('pointerover', () => {
            button.setFrame(1)
            buttonText.y += 5
        }).on('pointerout', () => {
            button.setFrame(0)
            buttonText.y -= 5
        }).on('pointerdown', () => {
            dialog.destroy()
            cardNumber.destroy()
            step.destroy()
            hard.destroy()
            button.destroy()
            buttonText.destroy()
            

            this.timerLabel = this.add.text(width * 0.5, 50, 0, { fontSize: 48 }).setOrigin(0.5)
            this.generateRandomNumber(numberOfRows, imagesPerRow);
            this.createCard(numberOfRows, imagesPerRow, startX, startY, horizontalSpacing, verticalSpacing, imageWidth, imageHeight, oldImageTexture, newImageTexture)
            this.number = this.array[Math.floor(Math.random() * (numberOfRows * imagesPerRow))]
            this.createDialog(this.number)
        })
        

    }



    hideDialog() {
        this.dialog.background.destroy()
        this.dialog.text.destroy()
        this.dialog.yesbutton.destroy()
    }

    generateRandomNumber(n, m) {
        this.array = [];
        let usedNumbers = new Set(); // Sử dụng Set để lưu trữ số đã sử dụng
    
        for (let i = 0; i < n * m; i++) {
            let randomNumber;
            do {
                randomNumber = Math.floor(Math.random() * 100);
            } while (usedNumbers.has(randomNumber));
    
            this.array[i] = randomNumber;
            usedNumbers.add(randomNumber);
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
        this.textCards.push(numberText)
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
        //this.countdown.update()



        if(this.check)
        {

            this.win()
            
        }
    }

    async win()
    {
        this.check = false
        const {width, height} = this.scale
        this.overlay = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000, 0);
        this.overlay.setOrigin(0, 0).setInteractive().setDepth(3);
        await this.delay(1500)
        const button = this.add.sprite(width/2, height/2, 'square', 2).setDepth(4).setScale(14, 10)
        const buttonText = this.add.text(button.x - 90, button.y - 35, "You Win!", {
            fontSize: '45px',
            color: 'white',
            fontFamily: 'Arial',
        }).setDepth(4)
        await this.delay(1500)
        this.dialog1.destroy()
        this.dialogText1.destroy()
        this.count = 0
        button.destroy()
        buttonText.destroy()
        this.array = []
        this.cards.forEach(card => {
            card.destroy()
        })

        this.textCards.forEach(text => {
            text.destroy()
        })
        this.timerLabel.destroy()
        this.textCards = []
        this.cards = []
        this.numberOfRows++

        if(this.numberOfRows < 5)
        {
            this.createDialog2(this.numberOfRows, this.imagesPerRow)
            this.overlay.destroy()
        }

        if(this.numberOfRows == 5)
        {

            const button = this.add.sprite(width/2, height/2, 'square', 2).setDepth(4).setScale(14, 10)
            const buttonText = this.add.text(button.x - 90, button.y - 35, "You Win!", {
                fontSize: '45px',
                color: 'white',
                fontFamily: 'Arial',
            }).setDepth(4)
            const buttonBack = this.add.sprite(width - 80, height - 50, 'square', 6).setScale(4).setDepth(5).setInteractive().on('pointerover', () => {
                buttonBackImage.y += 5
                buttonBack.setFrame(7)
            }).on('pointerout', () => {
                buttonBackImage.y -= 5
                buttonBack.setFrame(6)
            }).on('pointerdown', () => {
                this.numberOfRows = 2
                this.overlay.destroy()
                buttonBack.destroy()
                buttonBackImage.destroy()
                button.destroy()
                buttonText.destroy()
                buttonHome.destroy()
                buttonBackImage.destroy()
                this.count = 0
    
                this.createDialog2(this.numberOfRows, this.imagesPerRow)
            })

            
            const buttonBackImage = this.add.image(buttonBack.x, buttonBack.y- 5, 'back').setScale(0.3).setDepth(5)

            const buttonHome = this.add.sprite(width - 200, height - 50, 'square', 6).setScale(4).setDepth(5).setInteractive().on('pointerover', () => {
                buttonHomeImage.y += 5
                buttonHome.setFrame(7)
            }).on('pointerout', () => {
                buttonHomeImage.y -= 5
                buttonHome.setFrame(6)
            }).on('pointerdown', () => {
                this.numberOfRows = 2
                this.overlay.destroy()
                buttonBack.destroy()
                buttonBackImage.destroy()
                button.destroy()
                buttonText.destroy()
                buttonHome.destroy()
                buttonBackImage.destroy()
                this.count = 0
    
                this.scene.stop('Scene1')
                this.scene.start('intro')
            })

            const buttonHomeImage = this.add.image(buttonHome.x, buttonHome.y- 5, 'home').setScale(0.3).setDepth(5)
        }

    }

    async lose()
    {
        const {width, height} = this.scale
        this.overlay = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000, 0);
        this.overlay.setOrigin(0, 0).setInteractive().setDepth(3);
        await this.delay(2000)
        const button = this.add.sprite(width/2, height/2, 'square', 2).setDepth(5).setScale(14, 10)
        const buttonText = this.add.text(button.x - 90, button.y - 35, "You Lose!", {
            fontSize: '45px',
            color: 'white',
            fontFamily: 'Arial',
        }).setDepth(5)

        const buttonBack = this.add.sprite(width - 80, height - 50, 'square', 6).setScale(4).setDepth(5).setInteractive().on('pointerover', () => {
            buttonBackImage.y += 5
            buttonBack.setFrame(7)
        }).on('pointerout', () => {
            buttonBackImage.y -= 5
            buttonBack.setFrame(6)
        }).on('pointerdown', () => {
            console.log(this.step)
            this.overlay.destroy()
            buttonBack.destroy()
            buttonBackImage.destroy()
            button.destroy()
            buttonText.destroy()
            this.count = 0

            this.createDialog2(this.numberOfRows, this.imagesPerRow)
        })
        const buttonBackImage = this.add.image(buttonBack.x, buttonBack.y- 5, 'back').setScale(0.3).setDepth(5)
        // await this.delay(1500)
        this.dialog1.destroy()
        this.dialogText1.destroy()


        this.array = []
        this.cards.forEach(card => {
            card.destroy()
        })

        this.textCards.forEach(text => {
            text.destroy()
        })
        this.timerLabel.destroy()
        this.textCards = []
        this.cards = []


        // if(this.numberOfRows < 5)
        // {
        //     this.createDialog2(this.numberOfRows, this.imagesPerRow)
        //     this.overlay.destroy()
        // }
    }

    delay(duration) {
        return new Promise(resolve => {
            this.time.delayedCall(duration, resolve);
        });
    }
}

