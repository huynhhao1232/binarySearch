
import Scene3 from "./Scene3.js";
import Preload from "./Preload.js";





var config = {
    width: 1200,
    height: 700,
    backgroundColor: 0xdbefe1,
    scene: [Preload,Scene3],
    pixelArt: true,
    type: Phaser.AUTO,
    dom:{
        createContainer: true
    },
    parent: 'phaser-game',
    physics:{
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {

        
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



