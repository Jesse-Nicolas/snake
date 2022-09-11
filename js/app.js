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
const head = document.getElementById('snake')
const snake = document.getElementsByClassName('snake')
const food = document.querySelector('#food')
const title = document.querySelector('#message')
const body = document.querySelector('body')
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
  head.style.gridColumnStart = 10;
  head.style.gridRowStart = 10;
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
}

function removeAllSnakeBods(board)  {
  while (document.querySelector('.snake')) {
    let bod = document.querySelector('.snake')
    board.removeChild(bod)
  }
  //let bods = document.querySelectorAll('.snake')
}

function renderBod() {
    for (i=0; i<points; i++)  {
      let bod = document.createElement('div')
      bod.classList.add('snake')
      let obj = snakeArr[i]
      console.log(i)
      bod.style.gridColumnStart = obj.x
      bod.style.gridRowStart = obj.y
      board.appendChild(bod)
  }
}



function moveSnake()  {
  if (timer) {
    if (direction === 'down') {
      head.style.gridRowStart++
    }
    else if (direction === 'up')  {
      head.style.gridRowStart--
    }
    else if (direction === 'right') {
      head.style.gridColumnStart++
    }
    else if (direction === 'left')  {
      head.style.gridColumnStart--
    } 
  } else  {
    timer = setInterval(function()  {
      moveSnake()
    }, 300)
  }
  headPosition.x = head.style.gridColumnStart
  headPosition.y = head.style.gridRowStart
  snakeArr.unshift({x: headPosition.x, y: headPosition.y}) 
  if (snakeArr.length > 40) {snakeArr.pop()}
  //condtion for when you score a point:
  if  (food.style.gridColumnStart === head.style.gridColumnStart && food.style.gridRowStart === head.style.gridRowStart)  {
    goodJob()
  }
  removeAllSnakeBods(board)
  renderBod()
  //condition for when you lose; either by going outside the board or by hitting the snake body:
}
