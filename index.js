const GAME_SECONDS = 30;

class Card {
  constructor(rank, image) {
    this.rank = rank;
    this.image = image;
  }
}

class CardInfo {
  constructor(cardId, value, howToFlip = '', flipped = false, shown = true) {
    this.id = cardId;
    this.value = value;
    this.howToFlip = howToFlip;
    this.flipped = flipped;
    this.shown = shown;
  }
}

const flipSound = new Audio('/sound/flip.wav');

// Gets game board from our html
const gameBoard = document.getElementById('gameBoard');

// Initializes cards and values
const gameCards = [];
const cardValues = [
  new Card('king', '/img/king.webp'),
  new Card('queen', '/img/queen.jpg'),
  new Card('joker', '/img/joker.webp'),
  new Card('burger', '/img/burger.jpg'),
  new Card('lofi', '/img/lofi.jpg'),
  new Card('robot', 'img/robot.jpg')
];
let mouseEvents = [
  'click',
  'dblclick',
  'mouseover',
  'C',
  'click',
  'Q',
  'S',
  'L',
  'click',
  'click',
  'dblclick',
  'mouseover'
];
let firstCard = -1;

// Create our deck
let deck = [...cardValues, ...cardValues];

// Initialize game
resetGame();
startTimer(GAME_SECONDS);

// Counts down to zero and then sends alert at timeout
function startTimer(seconds) {
  Swal.fire({
    type: 'question',
    title: 'Ready to play?',
    confirmButtonText: 'Go!',
    allowOutsideClick: false,
    heightAuto: false
  }).then(() => {
    for (let i = 0; i <= seconds; i++) {
      const timer = document.getElementById('timer');
      setTimeout(() => {
        timer.innerHTML = i;
      }, (seconds - i) * 1000);
    }
    setTimeout(loseGame, seconds * 1000 + 100);
  });
}

// Alerts the player that they lost
function loseGame() {
  const highestTimeoutId = setTimeout(() => {});
  for (let i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i);
  }
  Swal.fire({
    type: 'error',
    title: 'You lose!',
    confirmButtonText: 'Play Again?',
    allowOutsideClick: false,
    heightAuto: false
  }).then(() => {
    resetGame();
    startTimer(GAME_SECONDS);
  });
}

// Resets the game
// Shuffles the deck and resets timer
function resetGame() {
  gameBoard.innerHTML = '';
  deck = deck.sort(() => Math.random() - 0.5);
  mouseEvents = mouseEvents.sort(() => Math.random() - 0.5);
  for (let i = 0; i < 12; i++) {
    const randomMouseEvent = mouseEvents[i];
    const card = document.createElement('div');
    card.id = `card${i}`;
    if (randomMouseEvent === 'dblclick') {
      card.addEventListener(randomMouseEvent, () => flipCard(i));
      card.innerHTML = '🖱🖱';
    } else if (randomMouseEvent === 'click') {
      card.addEventListener(randomMouseEvent, () => flipCard(i));
      card.innerHTML = '🖱';
    } else if (randomMouseEvent === 'mouseover') {
      card.addEventListener(randomMouseEvent, () => flipCard(i));
      card.innerHTML = '☜☞';
    } else {
      document.addEventListener('keydown', event => {
        if (event.keyCode === randomMouseEvent.toUpperCase().charCodeAt(0)) {
          flipCard(i);
        }
      });
      card.innerHTML = randomMouseEvent;
    }
    gameBoard.appendChild(card);
    gameCards[i] = new CardInfo(i, deck[i]);
  }
}

// Function called when a card is clicked
// The game functions should be in here
function flipCard(cardId) {
  const currentFirstCard = firstCard;

  if (!gameCards[cardId].flipped) {
    flipSound.play();

    // Flips selected card
    gameCards[cardId].flipped = !gameCards[cardId].flipped;
    setCardVisuals(cardId);

    // Checks if this card is first card
    if (firstCard === -1) {
      // Remembers this card as the first card
      firstCard = cardId;
      return;
    }

    // Checks if card matchs first card
    if (gameCards[firstCard].value.rank === gameCards[cardId].value.rank) {
      gameCards[cardId].shown = false;
      gameCards[firstCard].shown = false;
      // clear current card
      // make both cards disappear
      firstCard = -1;
    } else {
      // Flips current card and selected card "face down"
      gameCards[cardId].flipped = false;
      gameCards[firstCard].flipped = false;
      // Clears current card if there are no matches
      firstCard = -1;
    }

    setTimeout(() => {
      setCardVisuals(cardId);
      setCardVisuals(currentFirstCard);
    }, 750);
  }

  if (checkWin()) {
    setTimeout(() => {
      const highestTimeoutId = setTimeout(() => {});
      for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
      }
      Swal.fire({
        type: 'success',
        title: `You won! You sly dog!\nScore: ${document.getElementById('timer').innerHTML}`,
        confirmButtonText: 'Play Again?',
        allowOutsideClick: false,
        heightAuto: false
      }).then(() => {
        resetGame();
        startTimer(GAME_SECONDS);
      }, 751);
    });
  }
}

// Changes the card picture depending on its flipped status
function setCardVisuals(cardId) {
  const card = document.getElementById(`card${cardId}`);
  if (gameCards[cardId].flipped) {
    card.classList.add('flip');
    card.style = `transform: rotateY(180deg); background: no-repeat center/100% 100% url(${
      deck[cardId].image
    }); color: transparent;`;
  } else {
    card.classList.remove('flip');
    card.style = '';
  }
  if (!gameCards[cardId].shown) {
    card.style = `visibility: hidden`;
  }
}

function checkWin() {
  return gameCards.every(info => !info.shown);
}
