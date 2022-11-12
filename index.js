const boxes = document.querySelectorAll(".boxes");
const btn = document.querySelector(".btn");
const statusText = document.querySelector(".statusText");
const winConditions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let options = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";
let running = false;
initializeGame();

function initializeGame() {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
  btn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function boxClicked() {
  const boxIndex = this.getAttribute("boxIndex");

  if (options[boxIndex] != !running) {
    return;
  }

  updateBox(this, boxIndex);
  checkWinner();
}

function updateBox(box, index) {
  options[index] = currentPlayer;
  box.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "0" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const boxA = options[condition[0]];
    const boxB = options[condition[1]];
    const boxC = options[condition[2]];

    if (boxA == "" || boxB == "" || boxC == "") {
      continue;
    }
    if (boxA == boxB && boxB == boxC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} won!`;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw`;
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  boxes.forEach((box) => (box.textContent = ""));
  running = true;
}
