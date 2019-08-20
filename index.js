// Gets game board from our html
const gameBoard = document.getElementById('gameBoard');

// Initializes cards and values
const cardArray = [];
const cardValues = [
  'king',
  'queen',
  'dairy queen',
  'burger king',
  'lofi',
  'robot'
];

// Create our deck
let deck = [...cardValues, ...cardValues];

// Initialize game
resetGame();
doTimer();

// Counts down from 5 to zero and then sends alert at timeout
function doTimer() {
  for (let i = 0; i <= 5; i++) {
    const timer = document.getElementById('timer');
    setTimeout(() => {
      timer.innerHTML = i;
    }, (5 - i) * 1000);
  }
  setTimeout(myAlert, 5001);
}

// Alerts the player that they lost
function myAlert() {
  alert('You lose!');
  resetGame();
  doTimer();
}

// Resets the game
// Shuffles the deck and resets timer
function resetGame() {
  gameBoard.innerHTML = '';
  deck = deck.sort(() => Math.random() - 0.5);
  for (let i = 0; i < 12; i++) {
    const card = document.createElement('div');
    card.id = `card${i}`;
    gameBoard.appendChild(card);
    cardArray[i] = {
      id: `card${i}`,
      value: deck[i],
      image: '',
      flipped: false,
      matched: false
    };
  }
  console.log(cardArray);
}
