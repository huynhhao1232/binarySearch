
import Scene3 from "./Scene3.js";
var gameSetting = {
    playerSpeed: 200,
    
}




var config = {
    width: window.innerWidth/2,
    height: window.innerHeight / 2,
    backgroundColor: 0xffffff,
    scene: [Scene3],
    pixelArt: true,
    type: Phaser.AUTO,
    parent: 'phaser-game',
    physics:{
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
    
}

var game = new Phaser.Game(config);


$(document).ready(function(){
    $('#actions-hide').click(function(){
        $('.rotateRight').toggleClass('rotateLeft')

        if($('.rotateRight').hasClass('rotateLeft'))
        {
            $('#actions').css('width', '0');
        }
        else{
            $('#actions').css('width', '120px');
        }
    })

    $('#actions #create').click(function(){
        if($('.action-menu-pullot').hasClass('d-none'))
        {
            $('.action-menu-pullot').removeClass('d-none')
        }
        else{
            $('.action-menu-pullot').addClass('d-none')
        }
    })

    $('#create-userdefined-go').click(function(){
        var A = $('.new-menu-option input').val()
        var numbers = A.split(',').map(Number);
        var x = $('.xinput input').val()
        
        const scene = game.scene.getScene('BubbleSortVisualization')
        scene.activeBox = x
        for(let i = 0; i < scene.array.length; i++)
        {
            scene.rectanglesGroup[i].destroy()
        }
        scene.array = []
        scene.rectanglesGroup = []
        console.log(scene.rectanglesGroup)
        numbers.forEach((number) => {
            scene.array.push(number)

        })

        
        console.log(scene.array)
        if(scene.array.length > 0)
        {
            scene.createA()
        }

    })

    $('#sort').click( async function(){
        $('.new-menu-option input').prop('disabled', true)
        $('#create-userdefined-go').css({
            'pointer-events': 'none'
          });
        var x = $('.xinput input').val()
        const scene = game.scene.getScene('BubbleSortVisualization')
        scene.activeBox = x
        await scene.bubbleSort()
        await scene.binarySearch()
        if(scene.isSorting === false)
        {
            $('.new-menu-option input').prop('disabled', false)
            $('#create-userdefined-go').css({
                'pointer-events': 'auto'
              });
        }
        
    })

})



