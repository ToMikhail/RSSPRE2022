const gameStatus = document.querySelector(".game-status");
const gameBoard = document.querySelector(".game-board");
const ceils = document.querySelectorAll(".ceil");
const resetBtn = document.querySelector(".reset");
const audioWinner = document.querySelector('.winner')
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

let currentTurn = "X";
let arrX = [];
let arrO = [];
let arrState = ["", "", "", "", "", "", "", "", ""];

let countTurn = 0;

function checkWinner(array) {
  for (let i = 0; i < winningConditions.length; i++) {
    if (
      array.includes(String(winningConditions[i][0])) &&
      array.includes(String(winningConditions[i][1])) &&
      array.includes(String(winningConditions[i][2]))
    ) {
      gameStatus.innerHTML = `${currentTurn} - won in ${Math.ceil(countTurn / 2)} moves`;
      gameBoard.removeEventListener("click", startGame);
      setBlink();
      playAudioWinner()
      return true;
    }
  }
}

function playAudioWinner() {
  audioWinner.currentTime = 0;
  audioWinner.play();
}

function setBlink() {
  gameStatus.classList.add('blink')
}

function setCeilColor() {
  ceils.forEach(element => {
    if(element.innerHTML === 'X') {
      element.style.color = 'coral';
    }
    if(element.innerHTML === 'O') {
      element.style.color = 'greenyellow';
    }
  });
}

let startGame = function startGame(event) {
  countTurn += 1;
  gameStatus.innerHTML = `${currentTurn} - next step`;
  if (event.target.innerHTML === "" && currentTurn === "X") {
    event.target.innerHTML = currentTurn;
    arrX.push(event.target.dataset.ceilIndex);
    gameStatus.innerHTML = `O - make the next move`;
    if (countTurn !== 9) {
      checkWinner(arrX);
      setCeilColor();
      currentTurn = "O";
    } else if (countTurn === 9) {
      checkWinner(arrX);
    }
  }
  else if (event.target.innerHTML === "" && currentTurn === "O") {
    event.target.innerHTML = currentTurn;
    arrO.push(event.target.dataset.ceilIndex);
    gameStatus.innerHTML = `X - make the next move`;
    checkWinner(arrO);
    setCeilColor();
    currentTurn = "X";
  }
  else if (countTurn === 9 && !checkWinner(arrX)) {
    gameStatus.innerHTML = `It was in the draw`;
  }

};

gameBoard.addEventListener("click", startGame);

resetBtn.addEventListener("click", () => {
  window.location.reload();
  gameStatus.innerHTML = `Let's start`;
});