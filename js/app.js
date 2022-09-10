/*-------------------------------- Constants --------------------------------*/




/*---------------------------- Variables (state) ----------------------------*/
let snakePosition 
let foodPosition
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
    console.log('up arrow!')
  }
  else if (evt.code === `ArrowDown`) {
    moveSnake('down')
    console.log("down arrow!")
  }
  else if (evt.code === `ArrowRight`) {
    moveSnake('right')
    console.log("right arrow!")
  }
  else if (evt.code === `ArrowLeft`) {
    moveSnake('left')
    console.log("left arrow!")
  }
  else if (evt.code === `Space`) {
    // this will reset the game after you lose
    direction = ''
    console.log("space bar!")
  }
}



function init() {
  // timerInterval = setInterval(moveSnake(), 1000)

  // console.log(timerInterval)  
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


}