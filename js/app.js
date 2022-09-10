/*-------------------------------- Constants --------------------------------*/




/*---------------------------- Variables (state) ----------------------------*/
let headLocation
let foodLocation
//array that will hold the location of each snake div as the game rolls forward
let snakeArr = []

/*------------------------ Cached Element References ------------------------*/
const snek = document.querySelector('#snek')
const food = document.querySelector('#food')
const title = document.querySelector('#message')
const board = document.querySelector('body')


/*----------------------------- Event Listeners -----------------------------*/
board.addEventListener('keydown', function(evt) {
  if (evt.code === `ArrowUp`) {
    console.log("up arrow!")
  }
  else if (evt.code === `ArrowDown`) {
    console.log("down arrow!")
  }
  else if (evt.code === `ArrowRight`) {
    console.log("right arrow!")
  }
  else if (evt.code === `ArrowLeft`) {
    console.log("left arrow!")
  }
  else if (evt.code === `Space`) {
    console.log("space bar!")
  }
})




/*-------------------------------- Functions --------------------------------*/
