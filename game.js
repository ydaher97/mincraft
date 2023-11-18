
import { draw as drowWorld} from "./js/world.js";


let lastRender = 0
const gameBoard = document.getElementById('game-board')

function main(currentTime){
    // window.requestAnimationFrame(main)

    const secLastRender = (currentTime - lastRender)/1000;
    // if(secLastRender < 1 / SNAKE_SPEED) return
    
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