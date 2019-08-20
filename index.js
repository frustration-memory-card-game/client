const gameBoard = document.getElementById('gameBoard');
const cardArray = [];
const cardValues = [
  'king',
  'queen',
  'dairy queen',
  'burger king',
  'lofi',
  'robot'
];

let deck = [...cardValues, ...cardValues];
resetGame();
doTimer();

function doTimer() {
  for (let i = 0; i <= 5; i++) {
    const timer = document.getElementById('timer');
    setTimeout(() => {
      timer.innerHTML = i;
    }, (5 - i) * 1000);
  }
  setTimeout(myAlert, 5001);
}

function myAlert() {
  alert('You lose!');
  resetGame();
  doTimer();
}

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
