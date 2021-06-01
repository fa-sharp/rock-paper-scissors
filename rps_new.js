// List of possible moves (not a proper Enum)
const MOVES = {1: 'Rock', 2: 'Paper', 3: 'Scissors'};
const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

// Track player and computer scores
let playerScore, computerScore;

// Event listener for clicking a move button. Also gets computer move and then calls playRound.
onPlayerMove = (event) => {
    let playerMove = parseInt(event.currentTarget.value);
    let computerMove = getComputerMove();

    playRound(playerMove, computerMove);
}

// Add click event listener to each move button
const moveButtons = document.querySelectorAll(".move-button");
moveButtons.forEach(moveButton => {
    moveButton.addEventListener("click", onPlayerMove)
});

// Possible statuses for each round
const PLAYER_WIN = 1;
const COMPUTER_WIN = 2;
const TIE = 3;

// Core game logic. Given the moves of player and computer:
// 1. Determines status PLAYER_WIN, COMPUTER_WIN, or TIE
// 2. Calls updateGame to update game display
function playRound(playerMove, computerMove) {
    if (playerMove === computerMove) {
        updateGame(playerMove,computerMove,TIE);
        return TIE;
    }
    else if (playerMove === ROCK) {
        switch (computerMove) {
            case PAPER:
                updateGame(playerMove,computerMove,COMPUTER_WIN);
                break;
            case SCISSORS:
                updateGame(playerMove,computerMove,PLAYER_WIN);
        }  
    }
    else if (playerMove === PAPER) {
        switch (computerMove) {
            case ROCK:
                updateGame(playerMove,computerMove,PLAYER_WIN);
                break;
            case SCISSORS:
                updateGame(playerMove,computerMove,COMPUTER_WIN);
        }
    }
    else if (playerMove === SCISSORS) {
        switch (computerMove) {
            case ROCK:
                updateGame(playerMove,computerMove,COMPUTER_WIN);
                break;
            case PAPER:
                updateGame(playerMove,computerMove,PLAYER_WIN);
        }
    }
}

// Elements for displaying moves and round result
const playerMoveDisplay = document.querySelector("#player-move-display");
const computerMoveDisplay = document.querySelector("#computer-move-display");
const roundResultDisplay = document.querySelector("#round-result-display");

// Messages to display for the round result (e.g. "Computer wins this round!, etc.")
const PLAYER_ROUND_WIN_MESSAGE = (playerMove, computerMove) => 
    `You win this round! ${MOVES[playerMove]} beats ${MOVES[computerMove]}!`;
const COMPUTER_ROUND_WIN_MESSAGE = (playerMove, computerMove) => 
    `Computer wins this round! ${MOVES[computerMove]} beats ${MOVES[playerMove]}!`;
const TIE_MESSAGE = "It's a tie! Play again.";

const POINTS_TO_WIN = 3;

// Update the game display based on the latest round
function updateGame(playerMove, computerMove, roundStatus) {
    playerMoveDisplay.textContent = MOVES[playerMove];
    computerMoveDisplay.textContent = MOVES[computerMove];

    switch (roundStatus) {
        case TIE:
            roundResultDisplay.textContent = TIE_MESSAGE;
            break;
        case COMPUTER_WIN:
            computerScore++;
            roundResultDisplay.textContent = COMPUTER_ROUND_WIN_MESSAGE(playerMove,computerMove);
            break;
        case PLAYER_WIN:
            playerScore++;
            roundResultDisplay.textContent = PLAYER_ROUND_WIN_MESSAGE(playerMove,computerMove);
            break;
        default:
            console.error("Error! Couldn't get proper round status :(");
    }

    updateScoreDisplays(playerScore, computerScore);

    // If player or computer has reached POINTS_TO_WIN, end the game
    if (playerScore === POINTS_TO_WIN || computerScore === POINTS_TO_WIN) {
        endGame();
    } 
}

// Score display elements
const playerScoreDisplay = document.querySelector("#player-score-display");
const computerScoreDisplay = document.querySelector("#computer-score-display");

// Update score display elements
function updateScoreDisplays(playerScore, computerScore) {
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
}

// Game display elements and statuses
const gameWinDisplay = document.querySelector("#game-win-display");
const PLAYER_GAME_WIN_MESSAGE = "YOU WIN!!";
const COMPUTER_GAME_WIN_MESSAGE = "COMPUTER WINS!!";

// Displays the winner and disables move buttons
function endGame() {
    if (playerScore === POINTS_TO_WIN)
        gameWinDisplay.textContent = PLAYER_GAME_WIN_MESSAGE;
    else
        gameWinDisplay.textContent = COMPUTER_GAME_WIN_MESSAGE;

    moveButtons.forEach(moveButton => {
        moveButton.classList.add("disabled");
        moveButton.disabled = true;
    });
    gameWinDisplay.append(createResetButton());
}

const RESET_BUTTON_TEXT = "Reset Game";
function createResetButton() {
    let resetButton = document.createElement("button");
    resetButton.id = "reset-button";
    resetButton.textContent = RESET_BUTTON_TEXT;
    resetButton.addEventListener("click", resetGame);
    
    return resetButton;
}

// Reset/initialize scores, buttons, and round results
function resetGame() {
    playerMoveDisplay.textContent = "";
    computerMoveDisplay.textContent = "";
    roundResultDisplay.textContent = "";

    gameWinDisplay.textContent = "";
    let resetButton = document.querySelector("#reset-button") ? 
        resetButton.remove() : null;

    moveButtons.forEach(moveButton => {
        moveButton.classList.remove("disabled");
        moveButton.disabled = false;
    });

    playerScore = 0;
    computerScore = 0;
    updateScoreDisplays(playerScore, computerScore);
}
resetGame(); // Initial call to set scores to 0

// Gets computer's move: returns random move of ROCK, PAPER, or SCISSORS
const MOVES_keys = Object.keys(MOVES);
function getComputerMove() {
    let randomIndex = Math.floor(Math.random() * MOVES_keys.length);
    return parseInt(MOVES_keys[randomIndex]);
}