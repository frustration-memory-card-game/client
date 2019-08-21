const GAME_SECONDS = 500;
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
let firstCard;

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
  setTimeout(loseGame, seconds * 1000 + 100);
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
    // Flips selected card
    gameCards[cardId].flipped = !gameCards[cardId].flipped;
    setFlipPic(cardId);
    // Checks if first card
    if(gameCards[cardId].flipped === true){
        if(firstCard !== -1){
            // Sets selected card as current card
            firstCard = cardId;
            console.log(`Setting new card`);
            console.log(firstCard);
        } else if(gameCards[firstCard].value.rank === gameCards[cardId].value.rank ){ //Checks if card matchs current card
            // make both cards disappear
            setFlipPic(cardId);
            setFlipPic(firstCard);
            // TODO: Pass up shown as an attribute
            gameCards[cardId].shown = false;
            gameCards[firstCard].shown = false;  
            gameCards[cardId].flipped = false;
            gameCards[firstCard].flipped = false;  
            // clear current card
            delete firstCard;
            console.log('Makes both cards disappear');
        } else {
            // Flips current card and selected card "face down"
            gameCards[cardId].flipped = false;
            console.log(`Current Card: ${firstCard}`);
            gameCards[firstCard].flipped = false;
            // Clears current card if there are no matches
            delete firstCard;
            console.log('No match');
        }
    } 
    // ELSE it justs turns back face down
}

// Resets the game
// Shuffles the deck and resets timer
function updateGameBoard(cardId) {
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

// Changes the card picture depending on its flipped status
function setFlipPic(cardId) {
    const card = document.getElementById(`card${cardId}`);
    if (gameCards[cardId].flipped) {
      card.style = `background: no-repeat center/100% 100% url(${deck[cardId].image}); color: transparent;`;
    } else {
      card.style = '';
    }
  }