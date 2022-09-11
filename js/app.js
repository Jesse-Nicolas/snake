/*-------------------------------- Constants --------------------------------*/




/*---------------------------- Variables (state) ----------------------------*/
let headPosition = {}
let foodPosition = {}
//array that will hold the location of each snake div as the game rolls forward
let loser = false
let direction = 0
let timer
let points = 0
let snakeArr = []



/*------------------------ Cached Element References ------------------------*/
const snake = document.querySelector('.snake')
const food = document.querySelector('#food')
const title = document.querySelector('#message')
const body = document.querySelector('body')
const snakeBody = document.querySelector('.snake')
const board = document.getElementById('board')


/*----------------------------- Event Listeners -----------------------------*/
body.addEventListener('keyup', function(evt) {
  handleClick(evt)
})




/*-------------------------------- Functions --------------------------------*/
function handleClick(evt) {
  if (evt.code === `ArrowUp` && direction !== 'down') {
    direction = 'up'
  }
  else if (evt.code === `ArrowDown` && direction !== 'up') {
    direction = 'down'
  }
  else if (evt.code === `ArrowRight` && direction !== 'left') {
    direction = 'right'
  }
  else if (evt.code === `ArrowLeft` && direction !== 'right') {
    direction = 'left'
  }
  else if (evt.code === `Space`) {
    //init() call only exists ~HERE~ to reset on the fly for testing. 
    //Later, this will only be available after losing. 
    //this wiring fix also makes the game timer begin before the snake starts moving.
    //this also stops the snake from 'skipping' faster if you button-mash the same 
    //direction, smoothing out overall gameplay
    //i think i'll make it into a button that switchs to hidden while you're playing.
    init()
  }

}



function init() {
  direction = 0
  snake.style.gridColumnStart = 10;
  snake.style.gridRowStart = 10;
  renderFood()
  moveSnake()
}

function renderFood()  {
  food.style.gridColumnStart = (Math.floor(Math.random() * 20))
  food.style.gridRowStart = (Math.floor(Math.random() * 20))
  foodPosition.x = food.style.gridColumnStart
  foodPosition.y = food.style.gridRowStart
  
}


function goodJob()  {
  renderFood()
  points++
  // snakeArr.push(headPosition)
  // console.log(snakeArr)
  // let newBod = document.createElement('div')
  // console.log(newBod)
  // newBod.classList.add('snake')
  // board.appendChild(newBod)
  // console.log(newBod)
}

function renderBod() {
  for (i=0; i>(-points); i--)  {
    let div
  }
}



function moveSnake()  {
  if (timer) {
    if (direction === 'down') {
      snake.style.gridRowStart++
    }
    else if (direction === 'up')  {
      snake.style.gridRowStart--
    }
    else if (direction === 'right') {
      snake.style.gridColumnStart++
    }
    else if (direction === 'left')  {
      snake.style.gridColumnStart--
    } 
  } else  {
    timer = setInterval(function()  {
      moveSnake()
    }, 333)
  }
  let x = snake.style.gridColumnStart
  let y = snake.style.gridRowStart
  snakeArr.push({x: x, y: y})
  // renderBod()    //already disabled - not sure of it's necessity.
  //condtion for when you score a point:
  if  (food.style.gridColumnStart === snake.style.gridColumnStart && food.style.gridRowStart === snake.style.gridRowStart)  {
    snakeArr.push({x: x, y: y})
    console.log(snakeArr)
    goodJob()
  }
  //condition for when you lose; either by going outside the board or by hitting the snake body:
}
