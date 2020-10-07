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

//Use strict to ensure clean code with variables
("use scrict");

const playerO = document.querySelector("#set-o");
const playerX = document.querySelector("#set-x");
const gameBox = document.querySelector("#gameBox");
const col1 = document.querySelector("#col1");
const col2 = document.querySelector("#col2");
const col3 = document.querySelector("#col3");




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

function changeBoxValue(e) {
  if (playerX.style.backgroundColor === "green") {
    currentPlayer = playerX;
  } else if (playerX.style.backgroundColor === "grey") {
    currentPlayer = playerO;
  }

  console.log(`change box current player is ${currentPlayer.id}`);
  if (currentPlayer.id === "set-x") {
    console.log("X played a turn - O's turn");
    e.target.textContent = "X";
  } else if (currentPlayer.id === "set-o") {
    e.target.textContent = "O";
    console.log("O played a turn - X's turn");
  }

  changePlayer(currentPlayer);
}

col1.addEventListener("click", (e) => {
  //a box was clicked -
  changeBoxValue(e);
});
col2.addEventListener("click", (e) => {
  //a box was clicked -
  changeBoxValue(e);
});
col3.addEventListener("click", (e) => {
  //a box was clicked -
  changeBoxValue(e);
});

//place code here to run at load of page
function init() {
  //disable Player "O" button and change X to green as X goes first

  console.log(`i am here`);
  playerX.style.backgroundColor = "green";
}

init();
