const GAME_SECONDS = 5;
class Card {
  constructor(rank, image) {
    this.rank = rank;
    this.image = image;
  }
}

class CardInfo {
  constructor(cardId, value, howToFlip = '', flipped = false, shown = true) {
    this.id = `card${cardId}`;
    this.value = value;
    this.howToFlip = howToFlip;
    this.flipped = flipped;
    this.shown = shown;
  }
}

// Gets game board from our html
const gameBoard = document.getElementById('gameBoard');

// Initializes cards and values
const gameCards = [];
const cardValues = [
  new Card('king', '/img/king.jpg'),
  new Card('queen', '/img/queen.jpg'),
  new Card('joker', '/img/joker.jpg'),
  new Card('burger', '/img/burger.jpg'),
  new Card('lofi', '/img/lofi.jpg'),
  new Card('robot', 'img/robot.jpg')
];

// Create our deck
let deck = [...cardValues, ...cardValues];

// Initialize game
resetGame();
startTimer(GAME_SECONDS);

// Counts down to zero and then sends alert at timeout
function startTimer(seconds) {
  for (let i = 0; i <= seconds; i++) {
    const timer = document.getElementById('timer');
    setTimeout(() => {
      timer.innerHTML = i;
    }, (seconds - i) * 1000);
  }
  setTimeout(/** loseGame*/ () => {}, seconds * 1000 + 100);
}

// Alerts the player that they lost
function loseGame() {
  alert('You lose!');
  resetGame();
  startTimer(GAME_SECONDS);
}

// Resets the game
// Shuffles the deck and resets timer
function resetGame() {
  gameBoard.innerHTML = '';
  deck = deck.sort(() => Math.random() - 0.5);
  for (let i = 0; i < 12; i++) {
    const card = document.createElement('div');
    card.id = `card${i}`;
    card.addEventListener('click', () => flipCard(i));
    card.innerHTML = i;
    gameBoard.appendChild(card);
    gameCards[i] = new CardInfo(i, deck[i]);
  }
  console.log(gameCards);
}

// Function called when a card is clicked
// The game functions should be in here
function flipCard(cardId) {
  console.log(cardId);
}
