'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting condition
let score;
let currentScore;
let activePlayer;
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEL.classList.add('hidden');
  document.getElementById('current--1').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  btnHold.disabled = false;
  btnRoll.disabled = false;
  activePlayer = 0;
};
init();
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1.Generate a randome dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  diceEL.classList.remove('hidden');
  diceEL.src = `dice-${dice}.png`;

  // 3. Check for rolled 1
  if (dice != 1) {
    //Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //Switch to next player
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  // 1. Add current score to active player's score
  score[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];
  // 2. check if player's score is >=100
  if (score[activePlayer] >= 100) {
    diceEL.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    btnHold.disabled = true;
    btnRoll.disabled = true;
  } else {
    // Switch to next player
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
