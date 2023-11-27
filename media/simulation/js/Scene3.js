import Rectangle from "./rectangle.js";

export default class Scene3 extends Phaser.Scene {
    constructor() {
        super('BubbleSortVisualization');
    }

    init() { }

    preload() { 
        this.load.image('ship', 'assets/ship.png') 
    }

    create() {

        this.array = [2, 3, 2, 1, 10, 5];
        this.isSorting = false;

        this.rectanglesGroup = []

        this.bubbleSortCode = `
        for i in range(n-1):
        for j in range(i + 1, n):
            if arr[i] < arr[j]:
               arr[i], arr[j] = arr[j], arr[i]
            `
        this.bar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        // this.rectanglesGroup = new Rectangle({
        //     scene: this,
        //     x: 50,
        //     y: 20,
        //     width: 20,
        //     height: 2,
        //     color: this.colorTable[0],
        //     depth: 1
        // })



        // this.drawRectangle(this.array, this.colorTable);
        // this.bubbleSort()

        this.activeBox = 3
        this.drawRectangle()
        this.speed = 1
        


        


    }

    update() {

        if(Phaser.Input.Keyboard.JustDown(this.bar))
        {
            this.pause()
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
    
    
    
    createA()
    {
        this.drawRectangle()
        
    }

    

    drawRectangle() {
        const barWidth = 16;
        const spacing = 10;
        
        const totalWidth = this.array.length * (barWidth + spacing);
        const startX = (this.game.config.width - totalWidth) / 2;
    
        const startY = this.game.config.height / 2;
    
        // Kiểm tra nếu chiều rộng thực tế của các cột lớn hơn chiều rộng của màn hình
        if (totalWidth > this.game.config.width) {
            this.game.config.width = totalWidth;
            this.scale.resize(totalWidth, this.game.config.height);
        }
    
        for (let i = 0; i < this.array.length; i++) {
            const barHeight = this.array[i] < 10 ? this.array[i] * 8 : this.array[i] * 5;
            const x = startX + i * (barWidth + spacing);
            const y = startY - barHeight;
    
            let rectangle = new Rectangle({
                scene: this,
                x: x,
                y: y,
                width: 25,
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
        let low = 0, hight = this.array.length - 1
        // this.highlightCodeLine(1)
        await this.delay(500)
        this.rectanglesGroup[low].changeColor(0x008000)
        this.rectanglesGroup[hight].changeColor(0x008000)
        // this.highlightCodeLine(2)
        await this.delay(2000)
        this.rectanglesGroup[low].changeColor(0xadd8e6)
        this.rectanglesGroup[hight].changeColor(0xadd8e6)
        while(low <= hight)
        {
            
            // this.highlightCodeLine(3)

            let mid = Math.floor(( low + hight ) / 2) ;
            console.log(this.array[mid])
            if(low === hight && this.array[mid] != this.activeBox)
            {
                this.rectanglesGroup[mid].changeColor(0xFF0000)
                await this.delay(1000)
                break
            }

            this.rectanglesGroup[low].changeColor(0xadd8e6)
            this.rectanglesGroup[hight].changeColor(0xadd8e6)
            this.rectanglesGroup[mid].changeColor(0x008000)
            await this.delay(2000)
            
            if(this.array[mid] == this.activeBox)
            {
                this.rectanglesGroup[mid].changeColor(0x0099FF)
                // this.highlightCodeLine(4)
                await this.delay(1500)
                // this.highlightCodeLine(5)
                this.check = true
                break;
            }

            
            if(this.array[mid] < this.activeBox)
            {
                // this.highlightCodeLine(6)
                // this.highlightCodeLine(7)
                this.rectanglesGroup[mid].changeColor(0xFF0000)
                for(let i = low; i <= mid; i++)
                {
                    this.rectanglesGroup[i].changeColor(0xFF0000)
                    await this.delay(1000)
                }
                
                low = mid + 1

            }
            else{
                // this.highlightCodeLine(8)

                // this.highlightCodeLine(9)
                this.rectanglesGroup[mid].changeColor(0xFF0000)
                for(let i = mid; i <= hight; i++)
                {
                    this.rectanglesGroup[i].changeColor(0xFF0000)
                    await this.delay(1000)
                }
                
                hight = mid - 1
            }
            await this.delay(3500)

            if(low === hight)
            {
                this.rectanglesGroup[low].changeColor(0x008000)

            }
            else{
                this.rectanglesGroup[low].changeColor(0x008000)
                this.rectanglesGroup[hight].changeColor(0x008000)
            }
            

            await this.delay(2000)

            this.kt = true

        }

    }

    async bubbleSort() {
        console.log(this.activeBox)
        this.isSorting = true
        for (let i = 0; i < this.array.length - 1; i++) {

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
                else{

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
            this.time.delayedCall(duration/this.speed, resolve);
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


