README Suggestions
List technologies used
Link to wireframes and user stories.
Document your planning and tell a story about your development process and problem-solving strategy.
List unsolved problems which would be fixed in future iterations.
Describe how you solved for the winner
Describe how some of your favorite functions work

#**TIC TAC TOE**
A game of Tic Tac Toe. The objective of the game is to get three X's or O's in a column , row or diagnoal.

##**To USE:** 
Upon loading the game is ready to play. X player plays first and then O player. To make a move click or touch set that square to an X or O.

When the game is completed a message will display the winner or a tie.

Click the Green label "Click here for a new Game"

AI user: TO play against the computer click the checkbox for 'play WOPR'. This initiates a game against the computer. X goes first and then the AI player will play for the O's.


##**User Stories:**
As a user, I should be able to start a new tic tac toe game
As a user, I should be able to click on a square to add X first and then O, and so on
As a user, I should be shown a message after each turn for if I win, lose, tie or who's turn it is next
As a user, I should not be able to click the same square twice
As a user, I should be shown a message when I win, lose or tie
As a user, I should not be able to continue playing once I win, lose, or tie
As a user, I should be able to play the game again without refreshing the page

##**Technologies Used:**
HTMK, CSS and JavaScript

##**WireFrame and Design:**
[WIREFRAME](https://ctrast.github.io/project1_tic_tac_toe/design/TIC%20TAC%20TOE.png)

##**Planning:**
I initially thought I would be able to use an UL and LI for the layout. I started with these tags and then changed to DIV since the Squares in the game field were not to be edited. 

##**Winner Logic:**
 Initially I thought through the logic of who is a winner. From my earlier work on solving game issues, ROCK PAPER SCISSORS, I learned that an array could be used to host the winning combos. TIC TAC TOE has eight winning combinations. In this imlementation there is an array of winning combos and that array is used to determine the winner and its also used for the AI player to determine how to block the X player. 
To determin winner - get all current player moves from the .square and then iterate over the eight winning combos. For each combo check to see if player moves includes the three winning combos, if so current player is winner. 
