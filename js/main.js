//Use strict to ensure clean code with variables
("use strict");

//to determine winner
//ROW winner: if index (0, 1, or 2) across columns(1,2,3) is same letter col1 0=x, col2 0=x, col3 0=x
//COLUMN winner: if index (0, 1, or 2) in SAME column(1,1,1) is same letter col1 0=x, col1 1=x, col1 2=x
//DIAG winner: if index (0,1 and 2) accross columns(1,2,3) is same letter col1 0=x, col2 1=x, col3 2=x
//DIAG winner: if index (2,1 and 0) accross columns(1,2,3) is same letter col3 2=x, col2 1=x, col1 0=x

/*

Create array of winning combos - these are used to determine a winner. 
If player has three indexs selected ( 0,4,8) then player is a winner 
*/
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

const playerO = document.querySelector("#set-o");
const playerX = document.querySelector("#set-x");
const gameBox = document.querySelector("#gameBox");
const col1 = document.querySelector("#col1");
const col2 = document.querySelector("#col2");
const col3 = document.querySelector("#col3");
const squares = document.querySelectorAll(".square");
const message = document.querySelector(".message");
const gamePlayMsg = document.querySelector(".buttons h3");
const playWopr = document.querySelector("input");

//After player takes turns:
//1. check each of the eight possible winning combos
//2. disable the curent player button and enable the other player button
//3. change the default value of a click to the current button value
const changePlayer = (currentPlayer) => {
  console.log(`cur player before change is  ${currentPlayer.id}`);
  if (currentPlayer.id === "set-x") {
    //if wopr is checked...
    if (playWopr.checked === true) {
      playWopr.disabled = true;
      currentPlayer = playerO;
      playerO.style.backgroundColor = "green";
      currentPlayer.style.backgroundColor = "grey";
      //let WOPR make a move
      wopr();
    } else {
      playerO.style.backgroundColor = "green";
      currentPlayer.style.backgroundColor = "grey";
      currentPlayer = playerO;
    }
  } else {
    playerX.style.backgroundColor = "green";
    currentPlayer.style.backgroundColor = "grey";
    currentPlayer = playerX;
  }
  console.log(`cur player AFTER change is  ${currentPlayer.id}`);
};

function gameOver(currentPlayer, gameOverMsg) {
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

  gameMessage(newGameMsg);
  gameMessageUpdateBackGround();
}

function gameMessageUpdateBackGround() {
  gamePlayMsg.style.backgroundColor = "green";
}

function gameMessage(msg) {
  console.log(`in gameMessage game message is ${msg}`);
  gamePlayMsg.textContent = msg;
}

/*
select the squares for entries for the currentPlayer -
iterate though the squares node collection - for each value that matches current player collect the index
check the array of winning combos and sub array of split combo 0,1,2 ect
if player has three of the indexes in winning combo = winner
*/
function isWinner(currentPlayer) {
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
    //console.log(`winningCombo 1 is ${winningCombo[i]}`);
    winCombo = String(winningCombo[i]).split(",");

    for (let wc = 0; wc < winCombo.length; wc++) {
      if (gamePlay.includes(parseInt(winCombo[wc]))) {
        //console.log(`game play includes ${parseInt(winCombo[wc])}`);
        winIndex = winIndex + 1;
      }
    }
    if (winIndex === 3) {
      //console.log(`winIndex count is  ${winIndex}`);
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
  //get the current player
  if (playerX.style.backgroundColor === "green") {
    currentPlayer = playerX;
  } else if (playerX.style.backgroundColor === "grey") {
    currentPlayer = playerO;
  }

  if (currentPlayer.id === "set-x") {
    playerTurnMsg = "X played a turn - O's turn";
    e.target.textContent = "X";
  } else if (currentPlayer.id === "set-o") {
    playerTurnMsg = "O played a turn - X's turn";
    e.target.textContent = "O";
  }

  gameMessage(playerTurnMsg);
  isWinner(currentPlayer);
  changePlayer(currentPlayer);
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

//add mouse over to help identify the squares being hovered
gameBox.addEventListener("mouseover", (e) => {
  //only allow if is square is '?'
  if (
    e.target.classList.contains("square") &&
    e.target.textContent === "?" &&
    squares[0].style.backgroundColor !== "grey"
  ) {
    e.target.style.backgroundColor = "green";
  }
});

//add mouse out to change hover color back to white
gameBox.addEventListener("mouseout", (e) => {
  if (
    e.target.classList.contains("square") &&
    e.target.textContent === "?" &&
    squares[0].style.backgroundColor !== "grey"
  ) {
    e.target.style.backgroundColor = "white";
  }
});

gamePlayMsg.addEventListener("click", (e) => {
  //console.log(`new game ${e.target.textContent}`);
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
  playWopr.disabled = false;
  playWopr.checked = false;
  init();
}

//place code here to run at load of page
function init() {
  //disable Player "O" button and change X to green as X goes first
  playerX.style.backgroundColor = "green";
}

init();

//AI component -
//when PC turn - get available indexs from squares and then use the first available index then set that square to the O play
// the goal of the AI component would be to first interupt a three index winning match of opponent ( X )
// after getting available indexs, see if any of the availble indexes lie within a winning three index combo
//click on the index that lies within the available index and where that index is within a winning index

function woprTurn(blockWinCombo) {
  //the opponent has two of three in a winning combo - get the combo not picked
  console.log(`wopr move is index ${blockWinCombo}`);
  if (gamePlayMsg.style.backgroundColor !== "green") {
    squares[blockWinCombo].textContent = "O";
    currentPlayer = playerO;
    playerTurnMsg = "WOPR played a turn - X's turn";

    changePlayer(currentPlayer);

    console.log(
      `IN wopr after current player , player turn msg ${playerTurnMsg}`
    );

    gameMessage(playerTurnMsg);

    isWinner(currentPlayer);
  }
}

/*
 wopr play - if player select get an array of opponent plays, check each for possibl winning combo
 if opponent play has two of three winning combos - click the third winning combo to block

*/
woprBlockMoves = [];

function wopr() {
  //get squares of opponent - use this list against array of winning combos
  // - if opponent has two of three indexs in a winning combo wopr clicks on the available index
  let woprPlayed = false;
  const squares = document.querySelectorAll(".square");
  opponentPlay = [];
  openSquaresToPlay = [];

  let blockWinMove = null;

  //what squares are open for play
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].innerText === "?") {
      openSquaresToPlay.push(i);
    }
  }

  //what squares are used by opponent
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].innerText === "X") {
      console.log(`squares innertext for ${i} is ${squares[i].innerText}`);
      opponentPlay.push(i);
    }
  }

  //check to see if the opponentPlay has winningCombos
  let curIndex = 0;
  loop1: for (let i = 0; i < winningCombo.length; i++) {
    winCombo = String(winningCombo[i]).split(",");
    curIndex = 0;
    blockWinMove = null;
    console.log(`evaluating for ${winCombo}...`);
    console.log(`opponent play is ${opponentPlay}...`);
    for (let j = 0; j < winCombo.length; j++) {
      //0,3,6
      if (
        opponentPlay.includes(parseInt(winCombo[j])) &&
        !woprBlockMoves.includes(parseInt(winCombo[j]))
      ) {
        console.log(
          `*****opponent play included in winning combo ${parseInt(
            winCombo[j]
          )}`
        );
        curIndex = curIndex + 1;
        console.log(`*****curIndex ${curIndex}`);
      } else if (!woprBlockMoves.includes(parseInt(winCombo[j]))) {
        console.log(`******adding a combo not played ${winCombo[j]}`);
        blockWinMove = parseInt(winCombo[j]);
      }
    }
    if (curIndex === 2) {
      //the eval of three indicates opponent has two of three indexes of a winning combo - click the third index.
      console.log(`******block win move ${blockWinMove}`);
      break;
    }
  }

  // is the opponent close to a three win combo?
  console.log(`********blockWinCombo play the turn at index ${blockWinMove}`);
  if (blockWinMove !== null) {
    //console.log(`the index to block the win is ${blockWinMove}`);
    woprBlockMoves.push(blockWinMove);
    console.log(`blocked moves are ${woprBlockMoves}`);
    woprTurn(blockWinMove);
    woprPlayed = true;
    //break;
  } else {
    curIndex = 0;
    blockWinMove = "";
    woprBlockMoves.push(openSquaresToPlay[0]);
    woprTurn(openSquaresToPlay[0]);
  }
}
