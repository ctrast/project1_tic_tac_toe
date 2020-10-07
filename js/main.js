console.log("main is connected");
//Use strict to ensure clean code with variables
'use scrict';


//to determine winner 
//ROW winner: if index (0, 1, or 2) across columns(1,2,3) is same letter col1 0=x, col2 0=x, col3 0=x 
//COLUMN winner: if index (0, 1, or 2) in SAME column(1,1,1) is same letter col1 0=x, col1 1=x, col1 2=x 
//DIAG winner: if index (0,1 and 2) accross columns(1,2,3) is same letter col1 0=x, col2 1=x, col3 2=x
//DIAG winner: if index (2,1 and 0) accross columns(1,2,3) is same letter col1 0=x, col2 1=x, col2 2=x
