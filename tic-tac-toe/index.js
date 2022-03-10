const gameStatus = document.querySelector(".game-status");
const gameBoard = document.querySelector(".game-board");
const ceils = document.querySelectorAll(".ceil");
const resetBtn = document.querySelector(".reset");
const resetContentBtn = document.querySelector(".btn-reset--content");
const audioWinner = document.querySelector(".winner");
const popUpResult = document.querySelector(".pop-up");
const score = document.querySelector(".score");
const scoreMenu = document.querySelector(".score-menu");
const scoreTableBody = document.querySelector(".table-body");
const closeMenu = document.querySelector(".close-menu");
const rowTableWinnerX = "<td class='score-table-ceil'>Win</td><td></td>";
const rowTableWinnerO = "<td class='score-table-ceil'></td><td>Win</td>";

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

function setWinner(array) {
  if (currentTurn === "X") {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
    }
  }
}

function openScore() {
  scoreMenu.classList.toggle("active");
}

function closeScore() {
  scoreMenu.classList.toggle("active");
}

score.addEventListener("click", openScore);

function playAudioWinner() {
  audioWinner.currentTime = 0;
  audioWinner.play();
}

function setBlink() {
  resetContentBtn.classList.add("blink");
}

function checkWinner(array) {
  for (let i = 0; i < winningConditions.length; i++) {
    if (
      array.includes(String(winningConditions[i][0])) &&
      array.includes(String(winningConditions[i][1])) &&
      array.includes(String(winningConditions[i][2]))
    ) {
      gameStatus.innerHTML = `${currentTurn} - won in ${countTurn} moves`;
      gameBoard.removeEventListener("click", startGame);
      setBlink();
      playAudioWinner();
      popUpResult.style.display = "block";
      addNoteToScoreBoard(currentTurn);
      return true;
    }
  }
}

function setResultLocalStore() {
  localStorage.setItem("key", { currentTurn: countTurn });
}

function setCeilColor() {
  ceils.forEach((element) => {
    if (element.innerHTML === "X") {
      element.style.color = "crimson";
      element.style.background = "rgb(231, 231, 231)";
    }
    if (element.innerHTML === "O") {
      element.style.color = "lime";
      element.style.background = "rgb(231, 231, 231)";
    }
  });
}

let startGame = function startGame(event) {
  countTurn += 1;
  if (event.target.innerHTML === "" && currentTurn === "X") {
    event.target.innerHTML = currentTurn;
    arrX.push(event.target.dataset.ceilIndex);
    gameStatus.innerHTML = `O - make the next move`;
    if (countTurn !== 9) {
      checkWinner(arrX);
      setCeilColor();
      currentTurn = "O";
    } else if (countTurn === 9 && checkWinner(arrX)) {
      checkWinner(arrX);
      setCeilColor();
    } else if (countTurn === 9 && !checkWinner(arrX)) {
      checkWinner(arrX);
      setCeilColor();
      gameStatus.innerHTML = `It was in the draw`;
      setBlink();
      popUpResult.style.display = "block";
    }
  } else if (event.target.innerHTML === "" && currentTurn === "O") {
    event.target.innerHTML = currentTurn;
    arrO.push(event.target.dataset.ceilIndex);
    gameStatus.innerHTML = `X - make the next move`;
    checkWinner(arrO);
    setCeilColor();
    currentTurn = "X";
  }
};

gameBoard.addEventListener("click", startGame);

closeMenu.addEventListener("click", closeScore);

resetBtn.addEventListener("click", () => {
  ceils.forEach((element) => {
    element.textContent = "";
    element.style.background = "none";
  });
  popUpResult.style.display = "none";
  currentTurn = "X";
  arrX = [];
  arrO = [];
  gameBoard.addEventListener("click", startGame);
  countTurn = 0;
  //   window.location.reload();
  //   popUpResult.style.display = "none";
  //   gameStatus.innerHTML = `Let's start`;
});

function addNoteToScoreBoard(winner) {
  let rowScore = document.querySelectorAll(".row");
  if (winner === "X") {
    winner =
      "<td class='score-table-ceil score-table--ceil-x'>Win</td><td class='score-table-ceil score-table--ceil-x'>Lose</td>";
  }
  else if (winner === "O") {
    winner =
      "<td class='score-table-ceil score-table--ceil-x'>Lose</td><td class='score-table-ceil score-table--ceil-x'>Win</td>";
  } else {
    winner =
      "<td class='score-table-ceil score-table--ceil-x'>-</td><td class='score-table-ceil score-table--ceil-x'>-</td>";
  }
  rowScore[0].remove();
  let tr = document.createElement("tr");
  tr.classList.add("row");
  tr.innerHTML = winner;
  scoreTableBody.append(tr);
}