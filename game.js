
import { draw as drowWorld} from "./js/world.js";


let lastRender = 0
const gameBoard = document.getElementById('game-board')

function main(currentTime){

    
    console.log('render')
    lastRender = currentTime


    update()
    
    draw()
}

window.requestAnimationFrame(main)


function update(){
    
}

function draw(){
    // gameBoard.innerHTML= ''
    drowWorld(gameBoard)
  
}





