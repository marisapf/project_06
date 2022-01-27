/**STATE**/
let gameState = {
  players: ['X', 'O'],
  board: [null, null, null, null, null, null, null, null, null],
  playerNames: ['', '', '', '']
};

const resetGameState = () => {
  return gameState;
}

/**DOM SELECTION**/
const nameOne = document.getElementById("name-one");
const setNameOne = document.getElementById("set-name-one");
const greetingOne = document.getElementById("greeting-one-holder");

const nameTwo = document.getElementById("name-two");
const setNameTwo = document.getElementById("set-name-two");
const greetingTwo = document.getElementById("greeting-two-holder");

const whoGoesFirst = document.getElementById("who-goes-first");
const whoIsXandO = document.getElementById("who-is-X-and-O");
const whoFirstMessage = document.getElementById("who-first-message");

const squareMessage = document.getElementById("square-message");
const firstLineMessage = document.getElementById("first-line-message");  //is this used? 
const gameResultMessage = document.getElementById("game-result-message");

//**EventListeners & functions for two players to enter their names, game greets players**//
setNameOne.addEventListener('click', function () {
  whoFirstMessage.innerText = '';
  greetingOne.innerText = `Hello ${nameOne.value}!`;
  
  if (!nameOne.value) greetingOne.innerText = `Please enter a name.`
  gameState.playerNames[0] = nameOne.value;
  greetingTwo.innerText = "";
})

setNameTwo.addEventListener('click', function () {
  whoFirstMessage.innerText = '';
  if (!gameState.playerNames[0]) {
    return greetingTwo.innerText = "Please enter a name in the first field."
  }
  if (!nameTwo.value) {
    nameTwo.value = 'computer';
    greetingTwo.innerText = `${nameOne.value} will play ${nameTwo.value}`;
    gameState.playerNames[3] = 'computer';
  }
  greetingTwo.innerText = `Hello ${nameTwo.value}!`;
  gameState.playerNames[1] = nameTwo.value;
})

/**EventListener & function for game to choose who goes first**/
whoGoesFirst.addEventListener('click', function () {
  if (!nameOne.value && !nameTwo.value) return whoFirstMessage.innerText = "Did you enter a name?";
  if (!gameState.playerNames[1]) {
    return whoFirstMessage.innerText = "Click submit next to empty field for second name to play computer."
  }
  if (gameState.playerNames[1] === 'computer') {
    gameState.playerNames[3] = 'computer';
    return whoFirstMessage.innerText = `${gameState.playerNames[0]} will go first and be 'X's and computer will go second and be 'Os'.`
  }

  let oneOrTwo = Math.floor((Math.random() * 2) + 1);
  if (oneOrTwo === 1) {
    whoFirstMessage.innerText = `${nameOne.value} will be 'X' and go first. ${nameTwo.value} will be 'O.'`;
    gameState.playerNames[2] = nameOne.value;
    gameState.playerNames[3] = nameTwo.value;
  }
  if (oneOrTwo === 2) {
    whoFirstMessage.innerText = `${nameTwo.value} will be 'X' and go first. ${nameOne.value} will be 'O.'`;
    gameState.playerNames[2] = nameTwo.value;
    gameState.playerNames[3] = nameOne.value;
  }
  whoIsXandO.innerText = `${gameState.playerNames[2]} is X and ${gameState.playerNames[3]} is O.`;
  nameOne.value = '';
  nameTwo.value = '';
});

/**FUNCTION to check winning conditions,takes a parameter that is an array of Xs and Os**/
const winningConditions = [
  [0, 1, 2],  
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkBoard = (gameArray) => {
  //let win = false;
  for (let i = 0; i < 8; i++) {
    let currentWinningCondition = winningConditions[i];
    let position1 = gameArray[currentWinningCondition[0]];
    let position2 = gameArray[currentWinningCondition[1]];
    let position3 = gameArray[currentWinningCondition[2]];

    if (position1 && position2 && position3);
    if (position1 === position2 && position2 === position3 && position1 === 'X') {
      squareMessage.innerText = '';
      
      return gameResultMessage.innerText = `${gameState.playerNames[2]} wins! Xs win!`
    }
    if (position1 === position2 && position2 === position3 && position1 === 'O') {
      squareMessage.innerText = '';
      return gameResultMessage.innerText = `${gameState.playerNames[3]} wins! Os win!`
    }
  }
}

//FUNCTION to check for tie
const checkTie = (gameArray) => {
  if (!gameArray.includes(null)) {
    return gameResultMessage.innerText = "It's a tie. Reset game to play again."
  }
}

//FUNCTION to check for empty spaces and let computer be second player
const computerPlayer = () => {
  
  const isNull = (space) => {
    if (!space) return space;
  }

  let spacesArray = gameState.board.filter(isNull);
  let randomNumIndex = Math.random((Math.floor() * spacesArray.length) + 1);
  let emptySpaceIndex = spacesArray[randomNumIndex];
  gameState.players[1] = gameState.board[emptySpaceIndex];
}

/**DOM SELECTION/FUNCTION for making tic tac toe board**/
const boardElement = document.getElementById("board");
const square = document.getElementsByClassName("square");

const renderBoard = () => {
  boardElement.innerText = '';
  for (i = 0; i < 9; i++) {
    const squareElement = document.createElement("div");
    squareElement.className = "square";
    squareElement.dataset.squareIndex = i;
    boardElement.appendChild(squareElement);
  }
}
renderBoard();

/**EVENT LISTENER for tic tac toe game board**/
let currentPlayer = gameState.players[1];
boardElement.addEventListener('click', function (event) {

  if (!gameState.playerNames[0] && !gameState.playerNames[1]) {
    return whoFirstMessage.innerText = "Please enter a name."
  }
  if (!gameState.playerNames[2] && !gameState.playerNames[3]) {
    return whoFirstMessage.innerText = "Please click 'Who goes first?'";
  }

  let squareIndex = event.target.dataset.squareIndex;

  if (currentPlayer === gameState.players[0] && gameState.playerNames[1] !== 'computer') {
    currentPlayer = gameState.players[1];
    squareMessage.innerText = `It is ${gameState.playerNames[2]}'s turn.`;
  } else {
    currentPlayer = gameState.players[0];
    squareMessage.innerText = `It is ${gameState.playerNames[3]}'s turn.`;
  }

  if (!event.target.innerText) {
    event.target.innerText = currentPlayer;
  } else {
    squareMessage.innerText = "That square is already taken."
  }

  gameState.board[Number(squareIndex)] = currentPlayer;

  checkBoard(gameState.board);
  checkTie(gameState.board);
});

//**RESET button**//
const resetButton = document.getElementById("reset-game");
resetButton.addEventListener('click', function () {
  window.location.reload();
});


//trying to end the game
//if (event.target.innerText) squareMessage.innerText = "There are no more moves.  Please reset the game and play again.

//do I need this? is this used? extra space for messages?
//const firstLineMessage = document.getElementById("first-line-message");  //is this used? 
