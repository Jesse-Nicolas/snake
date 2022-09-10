/*-------------------------------- Constants --------------------------------*/




/*---------------------------- Variables (state) ----------------------------*/
let snakePosition = {}
let foodPosition = {}
//array that will hold the location of each snake div as the game rolls forward
let snakeArr = []
let seconds = 0
let time


/*------------------------ Cached Element References ------------------------*/
const snek = document.querySelector('#snek')
const food = document.querySelector('#food')
const title = document.querySelector('#message')
const board = document.querySelector('body')


/*----------------------------- Event Listeners -----------------------------*/
board.addEventListener('keydown', function(evt) {
  handleClick(evt)
})




/*-------------------------------- Functions --------------------------------*/
function handleClick(evt) {

  if (evt.code === `ArrowUp`) {
    moveSnake('up')
  }
  else if (evt.code === `ArrowDown`) {
    moveSnake('down')
  }
  else if (evt.code === `ArrowRight`) {
    moveSnake('right')
  }
  else if (evt.code === `ArrowLeft`) {
    moveSnake('left')
  }
  else if (evt.code === `Space`) {
    // this will reset the game after you lose
    direction = ''
  }
}

init()

function init() {
  snek.style.gridRowStart = 10
  snek.style.gridColumnStart = 10
  renderFood()
  // timerInterval = setInterval(moveSnake(), 1000)
  // console.log(timerInterval)  
}

function renderFood()  {
  food.style.gridColumnStart = (Math.floor(Math.random() * 20))
  food.style.gridRowStart = (Math.floor(Math.random() * 20))
  foodPosition.x = food.style.gridColumnStart
  foodPosition.y = food.style.gridRowStart
  console.log(foodPosition)
}


function moveSnake(direction)  {
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
  snakePosition.x = snek.style.gridColumnStart
  snakePosition.y = snek.style.gridRowStart
  console.log(snakePosition)


}