export default class Mainscene extends Phaser.Scene
{
    constructor(){
        super('Mainscene')
    }
    preload(){
        this.load.image('pic1','../assets/1.png')
        this.load.image('pic2','../assets/2.png')
        this.load.image('pic3','../assets/3.png')
        this.load.image('pic4','../assets/4.png')
        this.load.image('pic5','../assets/5.png')
        this.load.image('pic6','../assets/6.png')
        this.load.image('pic7','../assets/7.png')
        this.load.image('pic8','../assets/8.png')
        this.load.image('pic9','../assets/9.png')
        this.load.image('pic10','../assets/10.png')
        this.load.image('pic11','../assets/11.png')


        this.load.image('btnnext','../assets/next.png')
        this.load.image('btnnextchosen','../assets/nextchosen.png')
        this.load.image('btnback','../assets/back.png')
        this.load.image('btnbackchosen','../assets/backchosen.png')
        this.load.image('arrow_left', '../assets/arrow_left.png')
        this.load.image('arrow_right', '../assets/arrow_right.png')

    }
    create(){
        
        this.image1 = this.add.image(0,0,'pic1').setOrigin(0,0)
        this.image2 = this.add.image(0,0,'pic2').setOrigin(0,0).setVisible(false)
        this.image3 = this.add.image(0,0,'pic3').setOrigin(0,0).setVisible(false)
        this.image4 = this.add.image(0,0,'pic4').setOrigin(0,0).setVisible(false)
        this.image5 = this.add.image(0,0,'pic5').setOrigin(0,0).setVisible(false)
        this.image6 = this.add.image(0,0,'pic6').setOrigin(0,0).setVisible(false)
        this.image7 = this.add.image(0,0,'pic7').setOrigin(0,0).setVisible(false)
        this.image8 = this.add.image(0,0,'pic8').setOrigin(0,0).setVisible(false)


        //this.btnNext = this.add.image(660,550,'btnnext').setOrigin(0,0).setDepth(1).setInteractive()
        this.btnNextchosen = this.add.image(660,550,'btnnextchosen').setOrigin(0,0).setDepth(2).setVisible(false)
        //this.btnBack = this.add.image(0,550,'btnback').setOrigin(0,0).setDepth(1).setVisible(false).setInteractive()
        this.btnBackchosen = this.add.image(0,550,'btnbackchosen').setOrigin(0,0).setDepth(2).setVisible(false)

        this.checkpoint = 0
        const {width, height} = this.scale
        //console.log(height)
        this.btnBack = this.add.rectangle(0, 0, 200, 1800, 'black').setAlpha(0.01).setDepth(2).setInteractive()
        this.arrowLeft = this.add.image(width/2-350 , height/2 + 20, 'arrow_left').setDepth(3).setScale(0.8).setAlpha(0.1)
        this.btnNext = this.add.rectangle(width, 0, 200, 1800, 'black').setAlpha(0.01).setDepth(2).setInteractive()
        this.arrowRight = this.add.image(width/2+350 , height/2 + 20, 'arrow_right').setDepth(3).setScale(0.8).setAlpha(0.1)
        
        this.btnNext.on('pointerover',() => {
            this.btnNext.setAlpha(0.05)
            this.arrowRight.setAlpha(0.3)
        }).on('pointerout', () => {
            this.btnNext.setAlpha(0.01)
            this.arrowRight.setAlpha(0.1)
        })
        this.btnNext.on('pointerdown',()=>{
            this.checkpoint++
            if(this.checkpoint>=8){
                this.checkpoint--
            }
            else {
                if(this.checkpoint == 1){
                    this.image1.setVisible(false)
                    this.image2.setVisible(true)
                    this.btnBack.setVisible(true)
                }
                else if(this.checkpoint == 2){
                    this.image2.setVisible(false)
                    this.image3.setVisible(true)
                }
                else if(this.checkpoint == 3){
                    this.image3.setVisible(false)
                    this.image4.setVisible(true)
                }
                else if(this.checkpoint == 4){
                    this.image4.setVisible(false)
                    this.image5.setVisible(true)
                }
                else if(this.checkpoint == 5){
                    this.image5.setVisible(false)
                    this.image6.setVisible(true)
                }
                else if(this.checkpoint == 6){
                    this.image6.setVisible(false)
                    this.image7.setVisible(true)
                }
                else if(this.checkpoint == 7){
                    this.image7.setVisible(false)
                    this.image8.setVisible(true)
                }
                
               
            }

        })

        this.btnBack.on('pointerover', () => {
            this.btnBack.setAlpha(0.05)
            this.arrowLeft.setAlpha(0.3)
        })

        this.btnBack.on('pointerout', () => {
            this.btnBack.setAlpha(0.01)
            this.arrowLeft.setAlpha(0.1)
        })
        this.btnBack.on('pointerdown',()=>{
            console.log('oke')
            this.checkpoint--
            if(this.checkpoint < 0){
                this.checkpoint++

            }
            else {

                if(this.checkpoint == 6){
                    this.image8.setVisible(false)
                    this.image7.setVisible(true)
                }
                else if(this.checkpoint == 5){
                    this.image7.setVisible(false)
                    this.image6.setVisible(true)
                }
                else if(this.checkpoint == 4)
                {
                    this.image6.setVisible(false)
                    this.image5.setVisible(true)
                }
                else if(this.checkpoint == 3)
                {
                    this.image5.setVisible(false)
                    this.image4.setVisible(true)
                }
                else if(this.checkpoint == 2)
                {
                    this.image4.setVisible(false)
                    this.image3.setVisible(true)
                }
                else if(this.checkpoint == 1)
                {
                    this.image3.setVisible(false)
                    this.image2.setVisible(true)
                }
                else if(this.checkpoint == 0)
                {
                    this.btnBack.setVisible(false)
                    this.btnBackchosen.setVisible(false)
                    this.image2.setVisible(false)
                    this.image1.setVisible(true)
                }
            }
        })
    }
    update(){}
}