tic-tac-toe

I left nine brief single line comments in my JS file to keep track of different sections
and help me keep track of my code.
There are six easy to read brief comments in the HTML above certain parts. 

I tried to have messages come up for different scenarios:
1. If no name in first field is entered but if a name in second field is entered.
2. If a name in first field is entered but not in second field.
3. If no name is entered but someone clicks on 'who goes first' button or on board.
4. If a name is entered in the first field but not the second, the 'who goes first' 
   is not clicked and the board is clicked.
5. If user clicks on board before clicking anywhere else. 
6. If user clicks on first name field or both name fields but doesn't click on 'who goes first' field, 
   then clicks on board. 

I tried to write a function on lines 160-170 for a 'computer player' if second field is empty when clicked. 

My computerMove function did not work, but I thought the logic was sound or close. I might not be
invoking it properly.  I did not call this function but left it because I would like it to work.

The game allows for the computer to be the second player if no name is entered in the second field, and the messages will reflect this even though the computer as player feature does not work.

My checkBoard function worked but user(s) still have to have all the 
tic tac toe square entered before a game result message pops up and ends the game. 
 
Fixed the problem above, but now the
checkBoard functions works with testArrays of Xs and Os but doesn't work in the event listener.  It immediately returns a 'It's a tie' message on the first click.  If a win happens, the message changes. 

Unfortunately, I would have something working and it would cause something else to malfunction.  Originally, the checkFunction worked, it returned correctly a win or tie but all the squares had to be filled in.  Then we fixed the function so that it would immediately return a win when a win happened, but now the tie function is not working properly and it returns a tie message on the first click. 

