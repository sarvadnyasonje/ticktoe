const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const cells = [...document.querySelectorAll(".cell")];

const scores = { X: 0, O: 0, draw: 0 };
let board = Array(9).fill("");
let current = "X";
let over = false;
let winningLine = [];

function winner() {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line };
    }
  }
  return null;
}

function render() {
  cells.forEach((cell, i) => {
    cell.textContent = board[i];
    cell.classList.remove("x", "o", "win");
    if (board[i]) cell.classList.add(board[i].toLowerCase());
    if (winningLine.includes(i)) cell.classList.add("win");
    cell.disabled = over || Boolean(board[i]);
  });
}

function setStatus(text) {
  statusEl.textContent = text;
}

function updateScores() {
  document.getElementById("score-x").textContent = scores.X;
  document.getElementById("score-o").textContent = scores.O;
  document.getElementById("score-draw").textContent = scores.draw;
}

function play(index) {
  if (over || board[index]) return;

  board[index] = current;
  const result = winner();

  if (result) {
    over = true;
    winningLine = result.line;
    scores[result.player] += 1;
    setStatus(`Player ${result.player} wins`);
    updateScores();
  } else if (board.every(Boolean)) {
    over = true;
    scores.draw += 1;
    setStatus("It's a draw");
    updateScores();
  } else {
    current = current === "X" ? "O" : "X";
    setStatus(`Player ${current}'s turn`);
  }

  render();
}

function reset() {
  board = Array(9).fill("");
  current = "X";
  over = false;
  winningLine = [];
  setStatus("Player X starts");
  render();
}

boardEl.addEventListener("click", (event) => {
  const cell = event.target.closest(".cell");
  if (!cell) return;
  play(Number(cell.dataset.index));
});

resetBtn.addEventListener("click", reset);

render();
updateScores();
