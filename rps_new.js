const NUM_ROUNDS = 5;
const WELCOME_MESSAGE = `Welcome to Rock-Paper-Scissors! Best out of ${NUM_ROUNDS}, let's go!!`;

// List of possible moves (not a proper Enum)
const MOVES = {1: 'Rock', 2: 'Paper', 3: 'Scissors'};
const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

// Possible statuses for each round
const PLAYER_WIN = 1;
const COMPUTER_WIN = 2;
const TIE = 3;

// Messages for each round
const PLAYER_ROUND_WIN_MESSAGE = (playerMove, computerMove) => 
    `You win this round! ${MOVES[playerMove]} beats ${MOVES[computerMove]}!`;
const COMPUTER_ROUND_WIN_MESSAGE = (playerMove, computerMove) => 
    `Computer wins this round! ${MOVES[computerMove]} beats ${MOVES[playerMove]}!`;
const TIE_MESSAGE = "It's a tie! Play again.";
const INVALID_INPUT_MESSAGE = "Invalid move! Try again.";

// Messages for end of game
const PLAYER_GAME_WIN_MESSAGE = "YOU WIN!!";
const COMPUTER_GAME_WIN_MESSAGE = "COMPUTER WINS!! MUAHAHAHA!!";


// Event listener for player move. Gets computer move and plays a round.
onPlayerMove = (event) => {
    let playerMove = parseInt(event.currentTarget.value);
    let computerMove = getComputerMove();

    console.log("You played " + MOVES[playerMove]);
    console.log("Computer played " + MOVES[computerMove]);

    playRound(playerMove, computerMove);
}

// Add click event listener to each button
document.querySelectorAll(".move-button").forEach(moveButton => {
    moveButton.addEventListener("click", onPlayerMove)
});


// Gets computer's move: returns random move of ROCK, PAPER, or SCISSORS
const MOVES_keys = Object.keys(MOVES);
function getComputerMove() {
    let randomIndex = Math.floor(Math.random() * MOVES_keys.length);
    return parseInt(MOVES_keys[randomIndex]);
}

// Core game logic. Given the moves of player and computer:
// Returns status PLAYER_WIN, COMPUTER_WIN, or TIE
// Prints out appropriate message
function playRound(playerMove, computerMove) {
  console.log(playerMove);
  console.log(computerMove);
    if (playerMove === computerMove) {
        console.log(TIE_MESSAGE);
        return TIE;
    }
    else if (playerMove === ROCK) {
        switch (computerMove) {
            case PAPER:
                console.log(COMPUTER_ROUND_WIN_MESSAGE(playerMove,computerMove));
                return COMPUTER_WIN;
            case SCISSORS:
                console.log(PLAYER_ROUND_WIN_MESSAGE(playerMove, computerMove));
                return PLAYER_WIN;
        }  
    }
    else if (playerMove === PAPER) {
        switch (computerMove) {
            case ROCK:
                console.log(PLAYER_ROUND_WIN_MESSAGE(playerMove, computerMove));
                return PLAYER_WIN;
            case SCISSORS:
                console.log(COMPUTER_ROUND_WIN_MESSAGE(playerMove,computerMove));
                return COMPUTER_WIN;
        }
    }
    else if (playerMove === SCISSORS) {
        switch (computerMove) {
            case ROCK:
                console.log(COMPUTER_ROUND_WIN_MESSAGE(playerMove,computerMove));
                return COMPUTER_WIN;
            case PAPER:
                console.log(PLAYER_ROUND_WIN_MESSAGE(playerMove, computerMove));
                return PLAYER_WIN;
        }
    }
}


// A game of several rounds. In the case of a tie or invalid input,
// player is asked for another move.
function game() {
    console.log(WELCOME_MESSAGE);
    
    let playerScore = 0, computerScore = 0;

    for (let round = 1; round <= NUM_ROUNDS; round++) {
        let playerMove, computerMove, roundStatus;
        
        // Play a round. If there's a tie, try again.
        do {
            playerMove = getPlayerMove();
            computerMove = getComputerMove();
            roundStatus = playRound(playerMove, computerMove);
        } 
        while (roundStatus === TIE)

        // Increment the score for whoever won this round.
        switch (roundStatus) {
            case COMPUTER_WIN:
                computerScore++;
                break;
            case PLAYER_WIN:
                playerScore++;
                break;
            default:
                console.error("Error! Neither player or computer won :(");
        }
        
        // Print out score as of this round:
        printRoundScore(round);
    }

    // Print out winner of this game
    if (playerScore > computerScore)
        console.log(PLAYER_GAME_WIN_MESSAGE);
    else
        console.log(COMPUTER_GAME_WIN_MESSAGE);

    
    function printRoundScore(round) {
        console.log(
            `ROUND ${round}: \nPlayer: ${playerScore}\nComputer: ${computerScore}\n\n`);
    }
}

// Testing functionality
// game();
