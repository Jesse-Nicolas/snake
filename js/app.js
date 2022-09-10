/*-------------------------------- Constants --------------------------------*/




/*---------------------------- Variables (state) ----------------------------*/
let snekHead = {}
let foodPosition = {}
//array that will hold the location of each snake div as the game rolls forward
let loser = false
let direction = 0
let timer
let points = 0
let snakeArr = []



/*------------------------ Cached Element References ------------------------*/
const snek = document.querySelector('#snek')
const food = document.querySelector('#food')
const title = document.querySelector('#message')
const board = document.querySelector('body')
const snakeBody = document.querySelector('.snake')


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
    //i think i'll make it into a button that switchs to hidden while you're playing.
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
}


function goodJob()  {
  renderFood()
  points++
  snakeArr.push(snekHead)
  console.log(snakeArr)
  // let newBod = document.createElement('div')
  // newBod.classList.add('snake')
  // board.appendChild(newBod)
  // console.log(newBod)
}

function renderBod() {
  snakeArr[0] = snekHead
  snakeArr.forEach(function(obj, idx)  {
    snakeArr[idx - 1] = obj
  })
  console.log(snakeArr)
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
  snekHead.x = snek.style.gridColumnStart
  snekHead.y = snek.style.gridRowStart
  renderBod()
  //condtion for when you score a point:
  if  (food.style.gridColumnStart === snek.style.gridColumnStart && food.style.gridRowStart === snek.style.gridRowStart)  {
    goodJob()
  }
  //condition for when you lose; either by going outside the board or by hitting the snake body:
}
