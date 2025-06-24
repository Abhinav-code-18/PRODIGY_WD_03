const board = document.getElementById('board');
const status = document.getElementById('status');
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let gameActive = true;

function createBoard() {
  board.innerHTML = '';
  gameBoard.forEach((_, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || gameBoard[index]) return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winningPattern = checkWinner();
  if (winningPattern) {
    highlightWinningCells(winningPattern);
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (!gameBoard.includes(null)) {
    status.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
      return pattern;
    }
  }
  return null;
}

function highlightWinningCells(pattern) {
  pattern.forEach(index => {
    const cell = document.querySelector(`.cell[data-index="${index}"]`);
    cell.classList.add('winning-cell');
  });
}

function resetGame() {
  gameBoard = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

// Initialize
createBoard();
