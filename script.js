const squaresContainer = document.querySelector("#squares");
const numberOfSquares = 16;
let i = 0;
let square1, square2;
let clickCount = 0;

let score = 0;

document.querySelector("#score").style.visibility = "hidden";
const playAgainBtn = document.querySelector("button");
playAgainBtn.style.visibility = "hidden";
playAgainBtn.addEventListener("click", playAgain);

let colors = [
  "#F45D01",
  "#F45D01",
  "#FF4F79",
  "#FF4F79",
  "#3ff3f3",
  "#3ff3f3",
  "#4392F1",
  "#4392F1",
  "#EEB902",
  "#EEB902",
  "#16DB65",
  "#16DB65",
  "#B4656F",
  "#B4656F",
  "#8338EC",
  "#8338EC",
];

function selectColor() {
  const random = Math.floor(Math.random() * colors.length);
  const selected = colors[random];
  colors.splice(random, 1);
  return selected;
}

while (i < numberOfSquares) {
  const square = document.createElement("li");
  let color = selectColor();
  square.setAttribute("data-color", color);
  squaresContainer.appendChild(square);
  i++;
}

const squares = document.querySelectorAll("li");
for (const square of squares) {
  square.addEventListener("click", squareClicked);
}

function squareClicked() {
  if (square1 == this) return;
  clickCount++;
  if (clickCount > 2) return;
  clickCount === 1 ? (square1 = this) : (square2 = this);
  if (clickCount === 1) {
    square1.style.background = square1.getAttribute("data-color");
  } else {
    square2.style.background = square2.getAttribute("data-color");
    checkMatch();
  }
}

function checkMatch() {
  let match =
    square1.getAttribute("data-color") === square2.getAttribute("data-color");
  if (!match) {
    setTimeout(function () {
      noMatch();
    }, 500);
  } else {
    isMatch();
    checkGameEnded();
  }
}

function noMatch() {
  square1.style.background = "";
  square2.style.background = "";
  square1 = "";
  square2 = "";
  clickCount = 0;
  console.log("no match");
}

function isMatch() {
  score++;
  document.querySelector("#score").innerText = score;
  document.querySelector("#score").style.visibility = "visible";

  square1.style.border = "none";
  square2.style.border = "none";
  square1.removeEventListener("click", squareClicked);
  square2.removeEventListener("click", squareClicked);
  clickCount = 0;
  console.log("is a match");
}

function checkGameEnded() {
  const target = numberOfSquares / 2;
  const gameOver = score === target ? true : false;
  if (gameOver) {
    playAgainBtn.style.visibility = "visible";
  }
}
function playAgain() {
  window.location.reload();
}
