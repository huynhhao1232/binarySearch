import Rectangle from "./rectangle.js";
import Desc from "./desc.js";
export default class Scene3 extends Phaser.Scene {
    constructor() {
        super('BubbleSortVisualization');
    }

    init() { }

    preload() {

    }

    create() {

        this.array = [2, 3, 2, 1, 10, 5];
        this.isSorting = false;

        this.rectanglesGroup = []
        this.stepCodeGroup = []

        // this.bubbleSortCode = `
        // for i in range(n-1):
        // for j in range(i + 1, n):
        //     if arr[i] < arr[j]:
        //        arr[i], arr[j] = arr[j], arr[i]
        //     `
        this.bar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.stepCode = ['Bước 1: Khởi tạo left và right', 'Bước 2: Tính toán chỉ số giữa (mid)', 'Bước 3: So sánh giá trị giữa và giá trị tìm kiếm', 'Bước 4: Lặp cho đến khi left <= right']
        // this.rectanglesGroup = new Rectangle({
        //     scene: this,
        //     x: 50,
        //     y: 20,
        //     width: 20,
        //     height: 2,
        //     color: this.colorTable[0],
        //     depth: 1
        // })
        //const inputField = this.add.dom(this.game.config.width / 2 - 20, this.game.config.height / 2 + 35).createFromHTML('<input class="numberSearch" type="number"  min="0" value="0">').setDepth(11)


        // this.drawRectangle(this.array, this.colorTable);
        // this.bubbleSort()
        this.n = 1
        this.value = 1

        this.activeBox = 1
        //this.drawRectangle()
        this.speed = 1
        this.countArray()







    }

    createDescCode()
    {
        const { width, height } = this.scale
        for (let i = 0; i < this.stepCode.length; i++) {



            let desc = new Desc({
                scene: this,
                x: width - 400,
                y: 50 + (i * 100),
                value: this.stepCode[i],
                frame: 'button'
            });
            this.stepCodeGroup.push(desc)
            


        }
    }

    groundBack()
    {
        if(this.stepCodeGroup.length > 0)
        {
            this.stepCodeGroup.forEach(step => {
                step.destroy()
            })
            this.stepCodeGroup = []
        }

        if(this.rectanglesGroup.length > 0)
        {
            this.rectanglesGroup.forEach(rec => {
                rec.destroy()
            })
            this.rectanglesGroup = []
        }
    }

    async countArray() {
        const { width, height } = this.scale
        const button = this.add.sprite(width / 2, height / 2, 'button', 0).setScale(6)
        const text = this.add.text(button.x - 200, button.y - 40, 'Nhập số phần tử của mảng: ', {
            fontSize: '30px',
            fontFamily: 'Arial'
        })
        const inputField = this.add.dom(button.x, button.y + 20).createFromHTML('<input class="numberSearch" type="number"  min="1" value="1" style="outline: none; border: none; width: 100px; height: 30px; font-size: 30px; font-family: Arial; color: red">')

        const square = this.add.sprite(width - 90, height - 70, 'square', 6).setScale(4).setInteractive().on('pointerover', () => {
            square.setFrame(7)
            play.y += 5
        }).on('pointerout', () => {
            square.setFrame(6)
            play.y -= 5
        }).on('pointerdown', () => {
            this.dialog = null
            inputField.destroy()
            button.destroy()
            text.destroy()
            square.destroy()
            play.destroy()
            this.choice()

        })
        const play = this.add.image(width - 85, height - 75, 'play').setScale(0.3)
        this.dialog = {
            input: inputField,
            button: button,
            text: text,
            square: square,
            play: play
        }

    }

    choice()
    {
        const { width, height } = this.scale
        const button1 = this.add.sprite(width/2 - 200, height/2, 'button', 0).setScale(3).setInteractive().on('pointerover', () => {
            text1.y += 5
            button1.setFrame(1)
        }).on('pointerout', () => {
            button1.setFrame(0)
            text1.y -= 5
        }).on('pointerdown', () => {
            button1.destroy()
            text1.destroy()
            text2.destroy()
            button2.destroy()
            this.generateRandomNumber(this.n)
            this.numberSearch()

        })

        const text1 = this.add.text(button1.x - 65, button1.y - 25, 'Random', {
            fontSize: '35px',
            fontFamily: 'Arial'
        })

        const button2 = this.add.sprite(width/2 + 200, height/2, 'button', 0).setScale(3).setInteractive().on('pointerover', () => {
            text2.y += 5
            button2.setFrame(1)
        }).on('pointerout', () => {
            button2.setFrame(0)
            text2.y -= 5
        }).on('pointerdown', () => {
            button1.destroy()
            text1.destroy()
            text2.destroy()
            button2.destroy()
            this.inputArray()

        })

        const text2 = this.add.text(button2.x - 40, button2.y - 25, 'Nhập', {
            fontSize: '35px',
            fontFamily: 'Arial'
        })
    }

    generateRandomNumber(n) {
        this.array = [];
        let usedNumbers = new Set(); // Sử dụng Set để lưu trữ số đã sử dụng
    
        for (let i = 0; i < n; i++) {
            let randomNumber;
            do {
                randomNumber = Math.floor(Math.random() * 40);
            } while (usedNumbers.has(randomNumber));
    
            this.array[i] = randomNumber;
            usedNumbers.add(randomNumber);
        }
    
    } 

    async inputArray() {
        const { width, height } = this.scale
        const button = this.add.sprite(width / 2, height / 2, 'button', 0).setScale(6)
        const text = this.add.text(button.x - 230, button.y - 40, 'Nhập giá trị của mảng (Nhấn Enter): ', {
            fontSize: '30px',
            fontFamily: 'Arial'
        })
        const textArray = this.add.text(button.x - 180, button.y, 'a[0] = ', {
            fontSize: '30px',
            fontFamily: 'Arial'
        })
        this.array = []
        for (let i = 0; i < this.n; i++) {
            textArray.text = `a[${i}] = `
            const inputField = this.add.dom(button.x + 20, button.y + 16).createFromHTML('<input class="numberSearch" type="number"  min="1" value="1" style="outline: none; border: none; width: 100px; height: 30px; font-size: 30px; font-family: Arial; color: red">')

            this.dialogInput = {
                input: inputField
            }
            await new Promise((resolve) => {
                // Listen for space key press
                document.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {
                        resolve();
                    }
                });
            });
            inputField.destroy()

            this.array.push(this.value)

            if (i == this.n - 1) {
                this.dialogInput = null
                inputField.destroy()
                textArray.destroy()
                button.destroy()
                text.destroy()
                this.numberSearch()


            }



        }

    }

    async numberSearch() {
        const { width, height } = this.scale;
        const button = this.add.sprite(width / 2, height / 2, 'button', 0).setScale(6);
        const text = this.add.text(button.x - 200, button.y - 40, 'Nhập số cần tìm: ', {
            fontSize: '30px',
            fontFamily: 'Arial',
        });

        const inputField = this.add.dom(button.x, button.y + 20).createFromHTML('<input class="numberSearch" type="number"  min="1" value="1" style="outline: none; border: none; width: 100px; height: 30px; font-size: 30px; font-family: Arial; color: red">');

        const square = this.add.sprite(width - 90, height - 70, 'square', 6).setScale(4).setInteractive().on('pointerover', () => {
            square.setFrame(7);
            play.y += 5;
        }).on('pointerout', () => {
            square.setFrame(6);
            play.y -= 5;
        }).on('pointerdown', async () => {
            this.dialogInput2 = null;
            this.array.sort((a, b) => a - b);
            inputField.destroy();
            button.destroy();
            text.destroy();
            square.destroy();
            play.destroy();


            this.drawRectangle();
            

            const square2 = this.add.sprite(width - 90, height - 70, 'square', 6).setScale(4).setInteractive().on('pointerover', () => {
                square.setFrame(7);
                play.y += 5;
            }).on('pointerout', () => {
                square.setFrame(6);
                play.y -= 5;
            }).on('pointerdown', async () => {
                square2.destroy();
                play2.destroy();
                this.createDescCode()
                await this.binarySearch();
            });

            const play2 = this.add.image(width - 85, height - 75, 'play').setScale(0.3);
        });

        const play = this.add.image(width - 85, height - 75, 'play').setScale(0.3);

        this.dialogInput2 = {
            input: inputField,
            button: button,
            text: text,
            square: square,
            play: play,
        };
    }

    dialogSquare(mess)
    {
        const { width, height } = this.scale;
        const square = this.add.sprite(width/2, height -70, 'button', 0).setScale(8, 6)
        const text = this.add.text(square.x - 330, square.y-60, mess, {
            fontSize: '30px',
            fontFamily: 'Arial',
            wordWrap: {width: square.width + 550},
            align: 'justify'

        })

        this.dialogSquaree = {
            square: square,
            text: text
        }
    }

    hideDialogSquare()
    {
        if(this.dialogSquaree)
        {
            this.dialogSquaree.square.destroy()
            this.dialogSquaree.text.destroy()
            this.dialogSquaree = null
        }
    }







    update() {

        if (Phaser.Input.Keyboard.JustDown(this.bar)) {
            this.pause()
        }

        if (this.dialog && this.dialog.input.node) {
            const inputElement = this.dialog.input.node.querySelector('input');
            if (inputElement) {

                inputElement.addEventListener('input', () => {
                    const inputValue = parseInt(inputElement.value);

                    if (inputValue <= 0) {
                        inputElement.value = 1;
                    }
                    else if (inputValue > 20) {
                        inputElement.value = 20
                    }

                    this.n = parseInt(inputElement.value);
                });
            }
        }

        if (this.dialogInput && this.dialogInput.input.node) {
            const inputElement = this.dialogInput.input.node.querySelector('input');
            if (inputElement) {
                if (parseInt(inputElement.value) <= 0) {
                    inputElement.value = 1;
                }
                else if (parseInt(inputElement.value) > 40) {
                    inputElement.value = 40;
                }
                this.value = parseInt(inputElement.value)
            }
        }


        if (this.dialogInput2 && this.dialogInput2.input.node) {
            const inputElement = this.dialogInput2.input.node.querySelector('input');
            if (inputElement) {
                console.log(inputElement.value)
                if (parseInt(inputElement.value) <= 0) {
                    inputElement.value = 1;
                }
                else if (parseInt(inputElement.value) > 40) {
                    inputElement.value = 40;
                }
                this.activeBox = parseInt(inputElement.value)
            }
        }





    }


    async hightlight(currentStep) {
        const codeContainer = document.getElementById('code-container');
        const codePre = codeContainer.querySelector('pre');

        const bubbleSortCodeLines = this.bubbleSortCode.trim().split('\n');
        const highlightedCodeLines = bubbleSortCodeLines.map((line, index) => {
            let highlightClass = index === currentStep ? 'highlighted-line' : '';
            return `<div class="code-line ${highlightClass}">${line}</div>`;
        });

        codePre.innerHTML = highlightedCodeLines.join('');
    }



    createA() {
        this.drawRectangle()

    }



    drawRectangle() {
        console.log(this.array)
        const barWidth = 17;
        const spacing = 20;

        const totalWidth = this.array.length * (barWidth + spacing);
        const startX = (this.game.config.width - totalWidth) / 2 - 200;

        const startY = this.game.config.height / 2 + 200;

        // Kiểm tra nếu chiều rộng thực tế của các cột lớn hơn chiều rộng của màn hình
        if (totalWidth > this.game.config.width) {
            this.game.config.width = totalWidth;
            this.scale.resize(totalWidth, this.game.config.height);
        }

        for (let i = 0; i < this.array.length; i++) {
            const barHeight = this.array[i] * 10
            const x = startX + i * (barWidth + spacing);
            const y = startY - barHeight;

            let rectangle = new Rectangle({
                scene: this,
                x: x,
                y: y,
                width: 35,
                height: barHeight,
                value: this.array[i],
                depth: 1
            });

            this.rectanglesGroup.push(rectangle);
        }
    }




    // drawRectangle(array, colorTable) {
    //     const startX = 20;
    //     const startY = config.height / 2 + 30
    //     const barWidth = 20;

    //     const totalWidth = startX + array.length * (barWidth + 10);
    //     if (totalWidth > config.width) {
    //         config.width = totalWidth;
    //         this.scale.resize(totalWidth, config.height);
    //     }

    //     console.log(config.width)

    //     for (let i = 0; i < array.length; i++) {

    //         const barHeight = array[i] * 10; // Điều chỉnh tỷ lệ phù hợp
    //         const x = startX + i * (barWidth + 10);
    //         const y = startY - barHeight
    //         const randomColor = Phaser.Utils.Array.GetRandom(colorTable);
    //         const bar = this.add.rectangle(x, y, barWidth, barHeight, randomColor).setOrigin(0);
    //         this.rectanglesGroup.push(bar)
    //         const text = this.add.text(x + 5, y - 30, array[i])
    //     }
    // }

    highlightCodeLine(lineNumber) {
        // Xóa bôi vàng trên tất cả dòng
        for (let i = 1; i <= 9; i++) {
            document.getElementById('code' + i).style.backgroundColor = 'rgb(46, 187, 209)';
        }

        // Bôi vàng dòng code tương ứng
        document.getElementById('code' + lineNumber).style.backgroundColor = 'black';
    }

    async binarySearch() {
        this.kt = false
        this.check = false
        let low = 0, hight = this.n - 1
        this.dialogSquare('Đầu tiên chúng ta phải sắp xếp mảng lại theo thứ tự tăng dần')
        // this.highlightCodeLine(1)
        await this.delay(5000)
        this.hideDialogSquare()
        this.dialogSquare('Sau đó, chúng ta xem xét cột ở giữa')
        await this.delay(5000)
        this.hideDialogSquare()
        this.rectanglesGroup[low].changeColor(0x008000)
        this.rectanglesGroup[hight].changeColor(0x008000)
        this.dialogSquare(`Để tìm cột ở giữa, ta lấy vị trí của cột đầu tiên cộng với vị trí của cột cuối cùng (đó là ${hight+1}) rồi chia đôi.`)
        // this.highlightCodeLine(2)
        await this.delay(5000)

        this.rectanglesGroup[low].changeColor(0xadd8e6)
        this.rectanglesGroup[hight].changeColor(0xadd8e6)
        this.hideDialogSquare()
        while (low <= hight) {

            // this.highlightCodeLine(3)

            let mid = Math.floor((low + hight) / 2);
            
            if (low === hight && parseInt(this.array[mid]) != this.activeBox) {
                this.dialogSquare(`Cột ở giữa có vị trí là: ${mid} và cũng là cột cuối`)
                this.rectanglesGroup[mid].changeColor(0x008000)
                await this.delay(5000)
                this.hideDialogSquare()
                this.dialogSquare(`Nhưng không phải là số cần tìm nên mảng này không có giá trị là ${this.activeBox}`)
                this.rectanglesGroup[mid].changeColor(0xFF0000)
                await this.delay(5000)
                this.hideDialogSquare()
                break
            }

            this.dialogSquare(`Cột ở giữa có vị trí là: ${mid}`)
            this.rectanglesGroup[low].changeColor(0xadd8e6)
            this.rectanglesGroup[hight].changeColor(0xadd8e6)
            this.rectanglesGroup[mid].changeColor(0x008000)
            await this.delay(5000)
            this.hideDialogSquare()

            if (parseInt(this.array[mid]) == this.activeBox) {
                this.dialogSquare(`Đó là cột mang giá trị cần tìm nó nằm ở vị trí số ${mid}`)
                this.rectanglesGroup[mid].changeColor(0x0099FF)
                // this.highlightCodeLine(4)
                await this.delay(5000)
                this.hideDialogSquare()
                // this.highlightCodeLine(5)
                this.check = true
                break;
            }


            if (parseInt(this.array[mid]) < this.activeBox) {
                // this.highlightCodeLine(6)
                // this.highlightCodeLine(7)
                this.dialogSquare(`Giá trị cần tìm lớn hơn. Chúng ta tiếp tục xem xét các cột ở bên phải `)
                this.rectanglesGroup[mid].changeColor(0xFF0000)
                for (let i = low; i <= mid; i++) {
                    this.rectanglesGroup[i].changeColor(0xFF0000)
                    await this.delay(1000)
                }
                this.hideDialogSquare()
                low = mid + 1

            }
            else {
                // this.highlightCodeLine(8)
                this.dialogSquare(`Giá trị cần tìm nhỏ hơn. Chúng ta tiếp tục xem xét các cột ở bên trái `)
                // this.highlightCodeLine(9)
                this.rectanglesGroup[mid].changeColor(0xFF0000)
                for (let i = mid; i <= hight; i++) {
                    this.rectanglesGroup[i].changeColor(0xFF0000)
                    await this.delay(1000)
                }
                if (mid == 0) {
                    hight = 0
                }
                else {
                    hight = mid - 1
                }
                this.hideDialogSquare()


            }
            console.log(low)
            console.log(hight)
            this.dialogSquare(`Chúng ta xem xét các cột còn lại`)
            await this.delay(4000)
            this.hideDialogSquare()
            if (low == hight) {

                // Cột chưa thay đổi màu theo mong đợi
                this.rectanglesGroup[low].changeColor(0x008000)



            }
            else {
                this.rectanglesGroup[low].changeColor(0x008000)
                this.rectanglesGroup[hight].changeColor(0x008000)
            }


            await this.delay(2000)

            this.kt = true

        }

        const { width, height } = this.scale;


        const square = this.add.sprite(width - 90, height - 70, 'square', 6).setScale(4).setInteractive().on('pointerover', () => {
            square.setFrame(7);
            back.y += 5;
        }).on('pointerout', () => {
            square.setFrame(6);
            back.y -= 5;
        }).on('pointerdown', async () => {

            square.destroy();
            back.destroy();
            this.groundBack()
            this.countArray()
        })
        const back = this.add.image(width - 85, height - 75, 'back').setScale(0.3);

    }

    descCode(mess)
    {

    }

    async bubbleSort() {
        //console.log(this.activeBox)
        this.isSorting = true
        for (let i = 0; i < this.n; i++) {

            this.rectanglesGroup[i].changeColor(0x008000);
            await this.delay(1000)
            for (let j = i + 1; j < this.array.length; j++) {


                this.rectanglesGroup[j].changeColor(0x008000);
                await this.delay(1000)
                if (this.array[i] > this.array[j]) {

                    await this.delay(1000)
                    var temp = this.array[i];
                    this.array[i] = this.array[j];
                    this.array[j] = temp;
                    await this.delay(1000)
                    await this.moveRectangles(i, j);
                    await this.delay(1000)

                    // Đợi cho đến khi tweens hoàn thành
                }
                else {

                    await this.delay(1000)
                }
                this.rectanglesGroup[j].changeColor(0xadd8e6)

            }
            this.rectanglesGroup[i].changeColor(0xadd8e6);

        }
        this.isSorting = false;
    }

    delay(duration) {
        return new Promise(resolve => {
            this.time.delayedCall(duration / this.speed, resolve);
        });
    }

    async moveRectangles(index1, index2) {
        const rectangle1 = this.rectanglesGroup[index1];
        const rectangle2 = this.rectanglesGroup[index2];
        const originalX1 = rectangle1.x;
        const originalX2 = rectangle2.x;

        const distance = originalX2 - originalX1;
        const step = distance / 30; // Chia khoảng cách thành 30 bước

        for (let i = 0; i < 30; i++) {
            rectangle1.x += step;
            rectangle2.x -= step;

            await this.delay(16) // Đợi khoảng 16ms (gần 1 frame) trước khi tiếp tục
        }

        // Hoán đổi vị trí của các hình chữ nhật trong nhóm
        const temp = this.rectanglesGroup[index1];
        this.rectanglesGroup[index1] = this.rectanglesGroup[index2];
        this.rectanglesGroup[index2] = temp;

        // Đặt lại vị trí cuối cùng cho các hình chữ nhật
        rectangle1.x = originalX2;
        rectangle2.x = originalX1;
    }
}


