/*-------------------------------- Constants --------------------------------*/




/*---------------------------- Variables (state) ----------------------------*/
let snakePosition = {}
let foodPosition = {}
//array that will hold the location of each snake div as the game rolls forward
let snakeArr = []
let direction = 0
let timer



/*------------------------ Cached Element References ------------------------*/
const snek = document.querySelector('#snek')
const food = document.querySelector('#food')
const title = document.querySelector('#message')
const board = document.querySelector('body')


/*----------------------------- Event Listeners -----------------------------*/
board.addEventListener('keyup', function(evt) {
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
    init()
  }

}

init()

function init() {
  direction = 0
  snek.style.gridRowStart = 10
  snek.style.gridColumnStart = 10
  renderFood()
  moveSnake()
}

function renderFood()  {
  food.style.gridColumnStart = (Math.floor(Math.random() * 20))
  food.style.gridRowStart = (Math.floor(Math.random() * 20))
  foodPosition.x = food.style.gridColumnStart
  foodPosition.y = food.style.gridRowStart
  console.log(foodPosition)
}


function moveSnake()  {
  if (timer) {
    if (direction === 'down') {
      snek.style.gridRowStart++
    }
    else if (direction === 'up')  {
      snek.style.gridRowStart--
    }
    else if (direction === 'right') {
      snek.style.gridColumnStart++
    }
    else if (direction === 'left')  {
      snek.style.gridColumnStart--
    } 
  } else  {
    timer = setInterval(function()  {
      moveSnake()
    }, 333)
  }
  snakePosition.x = snek.style.gridColumnStart
  snakePosition.y = snek.style.gridRowStart
}
