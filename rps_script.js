const WELCOME_MESSAGE = `Welcome to Rock-Paper-Scissors! Best out of ${NUM_ROUNDS}, let's go!!`;
const NUM_ROUNDS = 5;

// List of possible moves
const MOVES = ['Rock', 'Paper', 'Scissors'];
const ROCK = MOVES.indexOf('Rock');
const PAPER = MOVES.indexOf('Paper');
const SCISSORS = MOVES.indexOf('Scissors');

// Possible statuses for each round
const PLAYER_WIN = 0;
const COMPUTER_WIN = 1;
const TIE = 2;

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


// Gets and validates player move: returns ROCK, PAPER, or SCISSORS
function getPlayerMove() {
    while (true) {
        let playerInput = prompt("Your move: ").trim().toUpperCase();
        let playerMove = MOVES.findIndex(move =>
                move.toUpperCase() === playerInput);

        // If valid input, return the move. Otherwise, will prompt the user again.
        if (playerMove != -1) {
            return playerMove;
        }
        else
            console.log(INVALID_INPUT_MESSAGE);
    }
}

// Gets computer's move: returns random move of ROCK, PAPER, or SCISSORS
function getComputerMove() {
    let randomIndex = Math.floor(Math.random() * MOVES.length);
    return randomIndex;
}

// Given the moves of player and computer:
// Returns status PLAYER_WIN, COMPUTER_WIN, or TIE
// Prints out appropriate message
function playRound(playerMove, computerMove) {
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
game();
