//to determine winner
//ROW winner: if index (0, 1, or 2) across columns(1,2,3) is same letter col1 0=x, col2 0=x, col3 0=x
//COLUMN winner: if index (0, 1, or 2) in SAME column(1,1,1) is same letter col1 0=x, col1 1=x, col1 2=x
//DIAG winner: if index (0,1 and 2) accross columns(1,2,3) is same letter col1 0=x, col2 1=x, col3 2=x
//DIAG winner: if index (2,1 and 0) accross columns(1,2,3) is same letter col3 2=x, col2 1=x, col1 0=x

//After player takes turns:
//1. check each of the four possible winning combos
//2. disable the curent player button and enable the other player button
//3. change the default value of a click to the current button value

console.log("main is connected");
winningCombo = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];
//Use strict to ensure clean code with variables
("use scrict");

const playerO = document.querySelector("#set-o");
const playerX = document.querySelector("#set-x");
const gameBox = document.querySelector("#gameBox");
const col1 = document.querySelector("#col1");
const col2 = document.querySelector("#col2");
const col3 = document.querySelector("#col3");
const squares = document.querySelectorAll(".square");
const message = document.querySelector(".message");
const gamePlayMsg = document.querySelector(".buttons h3");

const changePlayer = (currentPlayer) => {
  console.log(`cur player before change is  ${currentPlayer.id}`);
  if (currentPlayer.id === "set-x") {
    playerO.style.backgroundColor = "green";
    currentPlayer.style.backgroundColor = "grey";
    currentPlayer = playerO;
  } else {
    playerX.style.backgroundColor = "green";
    currentPlayer.style.backgroundColor = "grey";
    currentPlayer = playerX;
  }
  console.log(`cur player is NOW ${currentPlayer.id}`);
};

function gameOver(currentPlayer, gameOverMsg) {
  console.log(`game over message is ${gameOverMsg}`);

  squares.forEach((element) => {
    element.style.backgroundColor = "grey";
  });

  playerX.style.backgroundColor = "grey";
  playerO.style.backgroundColor = "grey";
  winnerMessage = document.createElement("h1");
  winnerMessage.setAttribute("text-align", "center");
  winnerMessage.textContent = gameOverMsg;
  message.appendChild(winnerMessage);

  newGameMsg = "Click here for a new Game";
  console.log(`new game message is ${newGameMsg}`);

  gameMessage(newGameMsg);
  gameMessageUpdateBackGround();
}

function gameMessageUpdateBackGround() {
  gamePlayMsg.style.backgroundColor = "green";
}

function gameMessage(msg) {
  console.log(`game message is ${msg}`);
  gamePlayMsg.textContent = msg;
}

function isWinner(currentPlayer) {
  //select the squares for entries for the currentPlayer -
  //iterate though the squares node collection - for each value that matches current player collect the index
  //check the array for winning combos (if winning combo exist in the gameplay array = winner)
  const squares = document.querySelectorAll(".square");
  let winMsg = "";
  let tieMsg = "";
  gamePlay = [];
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].innerText === currentPlayer.textContent) {
      gamePlay.push(i);
    }
  }

  //check to see if the winningCombos are in gamePlay
  winIndex = 0;
  for (let i = 0; i < winningCombo.length; i++) {
    console.log(`winningCombo 1 is ${winningCombo[i]}`);
    winCombo = String(winningCombo[i]).split(",");

    for (let wc = 0; wc < winCombo.length; wc++) {
      if (gamePlay.includes(parseInt(winCombo[wc]))) {
        console.log(`game play includes ${parseInt(winCombo[wc])}`);
        winIndex = winIndex + 1;
      }
    }
    if (winIndex === 3) {
      console.log(`winIndex count is  ${winIndex}`);
      winMsg = `Player ${currentPlayer.textContent} is the Winner!!!`;
      gameOver(currentPlayer, winMsg);
      break;
    } else {
      winIndex = 0;
    }
  }
  if (
    gamePlay.length === 5 &&
    currentPlayer.id === "set-x" &&
    gamePlayMsg.style.backgroundColor !== "green"
  ) {
    //the game is a tie
    let tieMsg = "The game is a tie";
    gameOver(currentPlayer, tieMsg);
  }
}

function changeBoxValue(e) {
  let playerTurnMsg = "";
  if (playerX.style.backgroundColor === "green") {
    currentPlayer = playerX;
  } else if (playerX.style.backgroundColor === "grey") {
    currentPlayer = playerO;
  }

  // console.log(`change box current player is ${currentPlayer.id}`);
  if (currentPlayer.id === "set-x") {
    playerTurnMsg = "X played a turn - O's turn";
    e.target.textContent = "X";
  } else if (currentPlayer.id === "set-o") {
    playerTurnMsg = "O played a turn - X's turn";
    e.target.textContent = "O";
  }

  changePlayer(currentPlayer);

  gameMessage(playerTurnMsg);

  isWinner(currentPlayer);
}
gameBox.addEventListener("click", (e) => {
  //only allow new click if is square and is '?'
  if (
    e.target.classList.contains("square") &&
    e.target.textContent === "?" &&
    col1.style.backgroundColor !== "grey"
  ) {
    e.target.style.backgroundColor = "white";
    changeBoxValue(e);
  }
});

//add mouse over to help identify the squares
gameBox.addEventListener("mouseover", (e) => {
  //only allow if is square is '?'
  console.log(`mouse enter ${e.target}`);
  if (
    e.target.classList.contains("square") &&
    e.target.textContent === "?" &&
    col1.style.backgroundColor !== "grey"
  ) {
    e.target.style.backgroundColor = "green";
  }
});

//add mouse out to change color back to white
gameBox.addEventListener("mouseout", (e) => {
  //only allow if is square is '?'
  console.log(`mouse leave ${e.target}`);
  if (
    e.target.classList.contains("square") &&
    e.target.textContent === "?" &&
    col1.style.backgroundColor !== "grey"
  ) {
    e.target.style.backgroundColor = "white";
  }
});

gamePlayMsg.addEventListener("click", (e) => {
  console.log(`new game ${e.target.textContent}`);
  if (e.target.textContent === "Click here for a new Game") {
    newGame();
  }
});

function newGame() {
  squares.forEach((element) => {
    element.textContent = "?";
    element.style.backgroundColor = "white";
  });
  playerO.style.backgroundColor = "grey";
  gamePlayMsg.style.backgroundColor = "white";
  gamePlayMsg.textContent = "X turn ready!";
  winnerMessage.textContent = "";
  init();
}

//place code here to run at load of page
function init() {
  //disable Player "O" button and change X to green as X goes first
  playerX.style.backgroundColor = "green";
}

init();
