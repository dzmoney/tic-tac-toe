//define gamebord, info & startCells with 9 empty
//make first go circle and set info display
const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startCells = new Array(9).fill("");

let go = "circle";
infoDisplay.textContent = "Circle goes first";

function createBoard() {
  //for each of startCells make cellElement a div with class of square
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    //add id to each cell = index
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    //add cell element to gameBoard
    gameBoard.append(cellElement);
  });
}
createBoard();

function addGo(e) {
  //make display var to create a div for each go & give it class of go
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  //make target of click event add goDisplay
  e.target.append(goDisplay);
  //change turn functionality, after circle's turn change to square
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = `It's ${go}'s turn!`;
  e.target.removeEventListener("click", addGo);
  checkScore();
}

function checkScore() {}
