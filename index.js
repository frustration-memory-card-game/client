const gameBoard = document.getElementById('gameBoard');

for (let i = 1; i <= 12; i++) {
  const card = document.createElement('div');
  card.id = `card${i}`;
  gameBoard.appendChild(card);
}

doTimer();

function doTimer() {
  for (let i = 0; i <= 5; i++) {
    const timer = document.getElementById('timer');
    setTimeout(() => {
      timer.innerHTML = i;
    }, (5 - i) * 1000);
  }
  setTimeout(myAlert, 5000);
}

function myAlert() {
  alert('You lose!');
  doTimer();
}
