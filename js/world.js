const grassSpan = document.getElementById('grassSpan');
const treeSpan = document.getElementById('treeSpan');
const rockSpan = document.getElementById('rockSpan');


const TILE_TYPES = {
    GRASS: 'grass',
    TREE: 'tree',
    ROCK: 'rock',
 
};

let selectedTool = null;
let selectedElement = null;


function selectTool(tool) {
    selectedTool = tool;
    const toolButtons = document.querySelectorAll('.tools button');
    toolButtons.forEach(button => {
        button.classList.remove('selected');
        if (button.id === tool + 'Button') {
            button.classList.add('selected');
        }
    });
}
function selectElement(element) {
    selectedElement = element;
    const elements = document.querySelectorAll('.materials h1');
    elements.forEach(el => {
        el.classList.remove('selected');
        if (el.id === element) {
            el.classList.add('selected');
        }
    });
}


function generateRandomMap(width, height) {
    const map = [];

    for (let row = 0; row < height; row++) {
        const currentRow = [];
        for (let col = 0; col < width; col++) {
            const randomTile = Math.random(); 

            if (randomTile < 0.8) {
                currentRow.push(TILE_TYPES.GRASS);
            } else if (randomTile < 0.9) {
                currentRow.push(TILE_TYPES.TREE);
            } else {
                currentRow.push(TILE_TYPES.ROCK);
            }
            
        }
        map.push(currentRow);
    }
    console.log(map.length)
    return map;
}

const mapWidth = 12;
const mapHeight =12;



 const worldMap = generateRandomMap(mapWidth, mapHeight);



 const removedTiles = [];

 
 const initGame = (gameBoard) => {
    const matrixSize = 268
    for (let i = 0; i < matrixSize; i++) {
        const row = addRow();
        gameBoard.appendChild(row)
        for (let j = 0; j < matrixSize; j++) {
            const cell = addCell()
            row.appendChild(cell)
            // handleCell(cell)
        }
        
    }
} 

const addRow = () => {
    const row = document.createElement("div");
    row.className = "row"
    return row;
}

const addCell = () =>{
    const cell = document.createElement("div")
    cell.className = "cell white-color"
    return cell;
}

export function draw(gameBoard) {
     gameBoard.innerHTML = '';
     initGame(gameBoard)
    
    for (let row = 0; row < worldMap.length; row++) {
        for (let col = 0; col < worldMap[row].length -1; col++) {
            const tileType = worldMap[row][col];
           

            const tile = document.createElement('div');
            // tile.style.gridColumnStart =  row
            // tile.style.gridRowStart =  col
            tile.classList.add('tile');
            tile.classList.add(tileType); 


            tile.addEventListener('click', () => {
                if (selectedTool) {
                    if (selectedTool === 'Axe' && tileType === TILE_TYPES.TREE) {
                        tile.className = 'cell white-color'; 
                        removedTiles.push( tileType ); 
                        treeSpan.textContent = removedTiles.filter(t => t === TILE_TYPES.TREE).length;

                    } else if (selectedTool === 'Pickaxe' && tileType === TILE_TYPES.ROCK) {
                        tile.className = 'cell white-color'; 
                        removedTiles.push( tileType ); 
                        rockSpan.textContent = removedTiles.filter(t => t === TILE_TYPES.ROCK).length;

                    } else if (selectedTool === 'Shovel' && tileType === TILE_TYPES.GRASS) {
                        tile.className = 'cell white-color';  

                        removedTiles.push( tileType ); 
                        grassSpan.textContent = removedTiles.filter(t => t === TILE_TYPES.GRASS).length;

                    }
                } else if (selectedElement) {
                    if (tile.classList.contains('white-color')) {
                        tile.classList.remove('white-color');
                        tile.classList.add(selectedElement);

                        const countSpan = document.getElementById(`${selectedElement}Span`);
                        if (countSpan) {
                            // countSpan.textContent = parseInt(countSpan.textContent) - 1; 
                            const index = removedTiles.indexOf(selectedElement);
                            if (index !== -1) {
                                removedTiles.splice(index, 1); // Remove selectedElement from removedTiles
                            }
                            countSpan.textContent = removedTiles.filter(t => t === selectedElement).length;
                        }
                    }
                }
            });
            
            gameBoard.appendChild(tile);
        }
    }
}



document.addEventListener('DOMContentLoaded', function () {
   

    const axeButton = document.getElementById('axeButton');
    const pickaxeButton = document.getElementById('pickaxeButton');
    const shovelButton = document.getElementById('shovelButton');
    const grassButton = document.getElementById('grass');
    const treeButton = document.getElementById('tree');
    const rockButton = document.getElementById('rock');
    

    axeButton.addEventListener('click', function () {
      selectTool('Axe');
      selectElement(null);
      

    });

    pickaxeButton.addEventListener('click', function () {
      selectTool('Pickaxe');
      selectElement(null);

    });

    shovelButton.addEventListener('click', function () {
      selectTool('Shovel');
      selectElement(null);

    });

    grassButton.addEventListener('click', function () {
        selectElement(TILE_TYPES.GRASS);
        selectTool(null)
    });

    treeButton.addEventListener('click', function () {
        selectElement(TILE_TYPES.TREE);
        selectTool(null)

    });

    rockButton.addEventListener('click', function () {
        selectElement(TILE_TYPES.ROCK);
        selectTool(null)

    });



  });

