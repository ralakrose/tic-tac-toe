let xClass = "x";
let oClass = "o";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8]
];
const cells = document.querySelectorAll("[data-cell]");
const boardgame = document.getElementById("boardgame");
const winningMessage = document.getElementById("winner");
const restartButton = document.getElementById("restart-btn");
const winningMessageText = document.querySelector("[message-text]");
let oTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  oTurn = false;
  cells.forEach(cell => {
    cell.classList.remove(xClass);
    cell.classList.remove(oClass);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true }); //this event listener listens only once
  });
  //call hover class before game starts
  setHoverClass();
  winningMessage.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? oClass : xClass;
  //place the X or O mark
  play(cell, currentClass);
  if (checkWinner(currentClass)) {
    gameOver(false);
  } else if (isDraw()) {
    gameOver(true);
  } else {
    //alternating players
    swapTurns();
    //hover effect
    setHoverClass();
  }
}

function gameOver(draw) {
  if (draw) {
    winningMessageText.innerText = "It's a Draw!";
  } else {
    winningMessageText.innerText = `${oTurn ? "O" : "X"} Wins!`;
  }
  winningMessage.classList.add("show");
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass);
  });
}

//function to place the mark
function play(cell, currentClass) {
  cell.classList.add(currentClass);
}

//function to swap turns
function swapTurns() {
  oTurn = !oTurn;
}

//hover function
function setHoverClass() {
  boardgame.classList.remove(xClass);
  boardgame.classList.remove(oClass);
  if (oTurn) {
    boardgame.classList.add(oClass);
  } else {
    boardgame.classList.add(xClass);
  }
}
//function to check the winner
function checkWinner(currentClass) {
  return winCombos.some(combo => {
    return combo.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}
