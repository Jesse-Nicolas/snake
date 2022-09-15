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
const buttons = document.getElementById('buttons')
const hand = document.getElementById('toggleHand')
const favicon = document.getElementById("favicon")

/*----------------------------- Event Listeners -----------------------------*/
window.addEventListener('keydown', function(evt) {
  evt.preventDefault()
  handleKey(evt.code)
})
buttons.addEventListener('click', function(evt) {
  handleClick(evt.target)
})

/*-------------------------------- Functions --------------------------------*/
function handleKey(evt) {
  if (evt === `ArrowUp` && direction !== 'down' && over === false) {
    direction = 'up'  }
  else if (evt === `ArrowDown` && direction !== 'up' && over === false) {
    direction = 'down'  }
  else if (evt === `ArrowRight` && direction !== 'left' && over === false) {
    direction = 'right' }
  else if (evt === `ArrowLeft` && direction !== 'right' && over === false) {
    direction = 'left'  }
  else if (evt === `Space` && over === true) {
    over = false
    init()
  }
}
function handleClick(evt) {
  if (evt.getAttribute('id') === `up` && direction !== 'down' && over === false) {
    direction = 'up'  }
  else if (evt.getAttribute('id') === `down` && direction !== 'up' && over === false) {
    direction = 'down'  }
  else if (evt.getAttribute('id') === `right` && direction !== 'left' && over === false) {
    direction = 'right' }
  else if (evt.getAttribute('id') === `left` && direction !== 'right' && over === false) {
    direction = 'left'  }
  else if (evt.getAttribute('id') === `space` && over === true) {
    over = false
    init()
  }
  else if (evt.getAttribute('id') === 'toggleHand') {
    toggleHand()
  }
}

function init() {
  board.style.backgroundColor = 'rgb(177, 172, 172)'
  title.textContent = `Snake!`
  aside.textContent = `Go ahead!`
  removeAllSnakeBods()
  points = 0
  direction = 0
  snakeArr = []
  head.style.gridColumnStart = 12;
  head.style.gridRowStart = 12;
  renderFood()
  moveSnake()
}

function toggleHand() {
  if (buttons.style.flexDirection === 'row')  {
    buttons.style.flexDirection = 'row-reverse'
    hand.textContent = 'right handed?'
  } else  {
    buttons.style.flexDirection = 'row'
    hand.textContent = 'left handed?'
  }
}

function changeFavicon() {
  if (over) {
    favicon.setAttribute("href", "./assets/food.png")  }
  else  {favicon.setAttribute("href", "./assets/snakeHead.png") }
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
  changeFavicon()
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
    if (obj.x === foodPosition.x && obj.y === foodPosition.y) {renderFood()}
    if (obj.x === headPosition.x && obj.y === headPosition.y) {gameOver()}
    board.appendChild(bod)
  }
}

function checkLoss()  {
  let lastFrame = snakeArr[1]
  if (headPosition.x === lastFrame.x && headPosition.y === lastFrame.y)  {
    if (headPosition.x == 12 && headPosition.y == 12) {}
    else {gameOver()} }
  if (headPosition.x > 23 || headPosition.y > 23) {gameOver()}
}

function gameOver() {
  board.style.backgroundColor = 'rgb(218, 85, 85, 1)'
  over = true
  changeFavicon()
  direction = 0
  if (points < 2) {aside.textContent = `oof!`} 
  else {aside.textContent = `You got ${points} points!`}
  title.textContent = `Press the space bar to play again!`
  clearInterval(timer)
  timer = null
}

function moveSnake()  {
  if (timer) {
    if (direction === 'down') {
      head.style.gridRowStart++ }
    else if (direction === 'up')  {
      head.style.gridRowStart-- }
    else if (direction === 'right') {
      head.style.gridColumnStart++  }
    else if (direction === 'left')  {
      head.style.gridColumnStart--  } 
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
    goodJob() }
  removeAllSnakeBods()
  renderBod()
  while (snakeArr.length > points+1) {snakeArr.pop()}
}

