const board = document.getElementById('board');
const statusText = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const overlay = document.getElementById('overlay');
const resultMessage = document.getElementById('resultMessage');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

board.addEventListener('click', (e) => {
  const index = e.target.dataset.index;
  if (!gameActive || gameState[index] !== "" || !index) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    gameActive = false;
    showOverlay(`Player ${currentPlayer} wins! 🎉`);
  } else if (!gameState.includes("")) {
    gameActive = false;
    showOverlay("It's a tie! 🤝");
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
});

function checkWinner() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function resetGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.textContent = "");
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  overlay.classList.add("hidden");
}

function showOverlay(message) {
  resultMessage.textContent = message;
  overlay.classList.remove("hidden");
}

function startNewGame() {
  resetGame();
}
