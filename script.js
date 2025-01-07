const board = document.getElementById("game-board");
const startButton = document.getElementById("start-button");
const timerDisplay = document.getElementById("timer");
const record = document.getElementById("best");

let cards = [];
let firstCard = null;
let secondCard = null;
let timer = null;
let time = 0;

// Genera el tablero
function createBoard(rows, cols) {
  const letters = "1234567890";
  const numPairs = (rows * cols) / 2;
  let cardValues = [];

  for (let i = 0; i < numPairs; i++) {
    cardValues.push(letters[i]);
    cardValues.push(letters[i]);
  }

  // Mezclar las cartas
  cardValues.sort(() => Math.random() - 0.5);

  // Crear las cartas en el DOM
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${cols}, 100px)`;

  cardValues.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card", "hidden");
    card.dataset.value = value;
    card.textContent = value;
    board.appendChild(card);

    card.addEventListener("click", handleCardClick);
  });
}

// Maneja el click en las cartas
function handleCardClick(event) {
  const clickedCard = event.target;

  if (
    clickedCard.classList.contains("matched") ||
    !clickedCard.classList.contains("hidden")
  ) {
    return;
  }

  clickedCard.classList.remove("hidden");

  if (!firstCard) {
    firstCard = clickedCard;
  } else if (!secondCard) {
    secondCard = clickedCard;

    // Verificar coincidencia
    if (firstCard.dataset.value === secondCard.dataset.value) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      firstCard = null;
      secondCard = null;

      // Verificar si el juego ha terminado
      if (document.querySelectorAll(".card.hidden").length === 0) {
        clearInterval(timer);
        alert(`¡Has ganado! Tiempo: ${time}s`);
      }
    } else {
      // Voltear de nuevo las cartas después de un breve intervalo
      setTimeout(() => {
        firstCard.classList.add("hidden");
        secondCard.classList.add("hidden");
        firstCard = null;
        secondCard = null;
      }, 1000);
    }
  }
}

// Inicia el juego
function startGame() {
  clearInterval(timer);
  time = 0;
  timerDisplay.textContent = "Tiempo: 0s";

  createBoard(4, 3);

  timer = setInterval(() => {
    time++;
    timerDisplay.textContent = `Tiempo: ${time}s`;
  }, 1000);
}

startButton.addEventListener("click", startGame);
