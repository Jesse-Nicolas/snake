/*---------------------------- Variables (state) ----------------------------*/
let headPosition = {}
let foodPosition = {}
let direction = 0
let timer
let points = 0
let snakeArr = []
let over = true

/*------------------------ Cached Element References ------------------------*/
const head = document.getElementById('snake')
const snake = document.getElementsByClassName('snake')
const food = document.querySelector('#food')
const title = document.querySelector('#title')
const body = document.querySelector('body')
const board = document.getElementById('board')
const aside = document.getElementById('aside')

/*----------------------------- Event Listeners -----------------------------*/
body.addEventListener('keyup', function(evt) {
  handleClick(evt)
})

/*-------------------------------- Functions --------------------------------*/
function handleClick(evt) {
  
  if (evt.code === `ArrowUp` && direction !== 'down' && over === false) {
    direction = 'up'
  }
  else if (evt.code === `ArrowDown` && direction !== 'up' && over === false) {
    direction = 'down'
  }
  else if (evt.code === `ArrowRight` && direction !== 'left' && over === false) {
    direction = 'right'
  }
  else if (evt.code === `ArrowLeft` && direction !== 'right' && over === false) {
    direction = 'left'
  }
  else if (evt.code === `Space` && over === true) {
    over = false
    init()
  }
}

function init() {
  board.style.backgroundColor = 'bisque'
  title.textContent = `Snake!`
  aside.textContent = `Press the space bar to play!`
  removeAllSnakeBods()
  points = 0
  snakeArr = []
  head.style.gridColumnStart = 11;
  head.style.gridRowStart = 11;
  renderFood()
  moveSnake()
}

function renderFood()  {
  food.style.gridColumnStart = (Math.floor(Math.random() * 23))
  food.style.gridRowStart = (Math.floor(Math.random() * 23))
  foodPosition.x = food.style.gridColumnStart
  foodPosition.y = food.style.gridRowStart
}

function goodJob()  {
  renderFood()
  points++
  aside.textContent = `Points: ${points}`
}

function removeAllSnakeBods()  {
  while (document.querySelector('.snake')) {
    let bod = document.querySelector('.snake')
    board.removeChild(bod)
  }
}

function renderBod() {
  for (i=1; i<=points; i++)  {
    let bod = document.createElement('div')
    bod.classList.add('snake')
    let obj = snakeArr[i]
    bod.style.gridColumnStart = obj.x
    bod.style.gridRowStart = obj.y
    if (obj.x === headPosition.x && obj.y === headPosition.y) {gameOver()}
    board.appendChild(bod)
  }
}

function checkLoss()  {
  let lastFrame = snakeArr[1]
  if (headPosition.x === lastFrame.x && headPosition.y === lastFrame.y && headPosition.x != 11) {
    gameOver()
  }
  if (headPosition.x > 23 || headPosition.y > 23)  {
    gameOver()
  }
}

function gameOver() {
  board.style.backgroundColor = 'red'
  over = true
  direction = 0
  aside.textContent = `Nice, you got ${points} points!`
  title.textContent = `Press the space bar to play again!`
  clearInterval(timer)
  timer = null
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
    }, 250)
  }
  headPosition.x = head.style.gridColumnStart
  headPosition.y = head.style.gridRowStart
  snakeArr.unshift({x: headPosition.x, y: headPosition.y}) 
  if (timer)  {checkLoss()}
  if  (food.style.gridColumnStart === head.style.gridColumnStart && food.style.gridRowStart === head.style.gridRowStart)  {
    goodJob()
  }
  removeAllSnakeBods()
  renderBod()
  while (snakeArr.length > points+1) {snakeArr.pop()}
}