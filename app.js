//PLAY AGAIN GAME RESET
const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", resetGame);

function resetGame() {
  const gameBoard = document.querySelector("#gameboard");
  gameBoard.innerHTML = "";

  //copy game initialization
  const startCells = new Array(9).fill("");
  let go = "circle";
  infoDisplay.textContent = "Circle goes first";
  createBoard();
}

//
// THE GAME
//
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

function checkScore() {
  //create var for all squares
  const allSquares = document.querySelectorAll(".square");
  //define winning combos
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //set circle and cross wins to false
  let circleWins = false;
  let crossWins = false;

  //for each winningCombo, check that every cell first child is class circle / cross
  winningCombos.forEach((combo) => {
    if (
      combo.every((cell) =>
        allSquares[cell].firstChild?.classList.contains("circle")
      )
    ) {
      circleWins = true;
    } else if (
      combo.every((cell) =>
        allSquares[cell].firstChild?.classList.contains("cross")
      )
    ) {
      crossWins = true;
    }
  });
  //if circle / cross wins change info display & remove event listener
  if (circleWins) {
    infoDisplay.textContent = "CIRCLE WINS!";
    allSquares.forEach((square) => square.replaceWith(square.cloneNode(true)));
  } else if (crossWins) {
    infoDisplay.textContent = "CROSS WINS!";
    allSquares.forEach((square) => square.replaceWith(square.cloneNode(true)));
  } else if (
    Array.from(allSquares).every(
      (square) =>
        square.firstChild?.classList.contains("circle") ||
        square.firstChild?.classList.contains("cross")
    )
  ) {
    infoDisplay.textContent = "IT'S A TIE!";
    allSquares.forEach((square) => square.replaceWith(square.cloneNode(true)));
  }
}
