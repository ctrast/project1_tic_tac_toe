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
'use scrict';

playerO = document.querySelector('#set-o');
playerx = document.querySelector('#set-x');
const changePlayer = (currentPlayer) => {
    console.log(playerO)
    currentPlayer.style.backgroundColor = 'green';
    currentPlayer.style.cursor ="X";
    if(playerx.style.backgroundColor==='green'){
        playero.disabled = true;
    }else{
        playerx.disabled = true;
    }
}

//place code here to run at load of page
function init() {
    //disable Player "O" button and change X to green as X goes first
    changePlayer(playerx);
  }
  
  init();

  