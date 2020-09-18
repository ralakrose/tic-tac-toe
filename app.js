let xClass = "x";
let oClass = "o";
const cells = document.querySelectorAll("[data-cell]");
const cells = document.getElementById("boardgame");
let oTurn;

cells.forEach(cell => {
  cell.addEventListener("click", handleClick, { once: true }); //this event listener listens only once
});

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? oClass : xClass;
  //place the X or O mark
  play(cell, currentClass);
  //check for winner
  //check for loser
  //alternating players
  swapTurns();
  //hover effect
  setHoverClass();
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
function setHoverClass() {}
