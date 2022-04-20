const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;

// Loop over the chars in `word` and create divs.
//

const createDivsForChars = (word) => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.disabled = true;
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => document.querySelector(`div.${letter}`) !== null;

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter, correctLettersNum) => {
  const correctLetters = document.querySelectorAll(`div.${letter}`);
  for (const correctLetter of correctLetters) {
    correctLetter.innerHTML = letter;
    correctLettersNum += 1;
    // console.log(correctLettersNum);
  }
  return correctLettersNum;
};

//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = () => {
  numWrong += 1;
  if (numWrong >= 5) {
    const disableButtons = document.querySelectorAll('#letter-buttons button');
    for (const button of disableButtons) {
      disableLetterButton(button);
    }
    document.getElementById("play-again").style.display = "inline";
  } else {
    console.log("wrong letter", numWrong);
    
    const newImage = document.querySelector("#shark-img img");
    // console.log(newImage);
    newImage.setAttribute('src',`/static/images/guess${numWrong}.png`);
  }
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';
  let correctLettersNum = 0;

  createDivsForChars(word);
  generateLetterButtons();

  for (const button of document.querySelectorAll('button')) {
    // add an event handler to handle clicking on a letter button
    // YOUR CODE HERE
    button.addEventListener('click', () => {
      const letter = button.innerHTML;  // can also use evt.target instead of button
    
      // you should disable the button so the letter can't be clicked again
      disableLetterButton(button);
    
      // you should then check if the currently clicked letter is in the word
      if (isLetterInWord(letter)){
        correctLettersNum = handleCorrectGuess(letter, correctLettersNum);
        if (correctLettersNum === word.length){
          const disableButtons = document.querySelectorAll('#letter-buttons button');
          for (const button of disableButtons) {
            disableLetterButton(button);
          }
          document.getElementById("win").style.display = "inline";
          document.getElementById("play-again").style.display = "inline";
        }
      } else {
        handleWrongGuess();
      }    
    });
  }

  // add an event handler to handle clicking on the Play Again button
  playAgain = document.getElementById("play-again")
  playAgain.addEventListener('click', (evt) => {
    resetGame();
  });
})();
