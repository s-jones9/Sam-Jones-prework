var availableLetters, words, answerArray, guess, lettersGuessed, lettersMatched, letters, numOfWins, wins, remainingGuesses, lives, currentWord, numLettersMatched, messages, showDestinationImg;

// create Get Elements for later access
numOfWins = document.getElementById('num-wins');
currentWordDisplay = document.getElementById('current-word');
remainingGuesses = document.getElementById('remaining-guesses');
lettersGuessedDisplay = document.getElementById('letters-guessed');
output = document.getElementById('output');
countryNameDisplay = document.getElementById('country-name');


// declare variables when game starts
function setup() {
  availableLetters = "abcdefghijklmnopqrstuvwxyz";
  wins = 0;
  lives = 20;
  answerArray = [];
  lettersGuessedArray = [];
  lettersGuessed = lettersMatched = '';
  numLettersMatched = 0

  // create an array of words
  words = [
    "tiger",
    "bear",
    "dog",
    "cat",
    "monkey",
    "squirrle",
    "lion",
    "goat",
    "buffalo",
  ];

  // create messages to interact with users via output.innerHTML
  messages = {
    start: 'Press any key to get started!',
    win: 'You win! I knew you could do it.',
    lose: 'Game Over!',
    correct: 'Nice going! Keep it up.',
    wrong: 'You’re on the right track. Try again.',
    guessed: 'Already guessed, please try again',
    validLetter: 'Please enter a letter from A-Z',
    congrats: "Congratulations! You've completed this word guess challenge!"
  };

}; // End setup function

// create a function to randomly choose a word with
function newWord() {
  // set values that are displayed on the browser to default
  answerArray = [];
  lettersGuessedArray = [];
  lettersGuessed = lettersMatched = '';
  numLettersMatched = 0

  numOfWins.innerHTML = wins;
  remainingGuesses.innerHTML = lives;
  lettersGuessedDisplay.innerHTML = lettersGuessedArray.join(" ");
  output.innerHTML = messages.start;

  // choose a random word 
  currentWord = words[Math.floor(Math.random() * words.length)];
  console.log("word: " + currentWord);
  console.log(words);

  // create the answer array

  for (var i = 0; i < currentWord.length; i++) {
    answerArray[i] = "_";
  }
  console.log(answerArray);
  currentWordDisplay.innerHTML = answerArray.join(" ");
  gameRound();
};

/* Once the window is loaded, run setup(); and newWord(); to start game */
window.onload = setup();
window.onload = newWord();

function gameRound() {
  // take input from the player
  document.onkeyup = function () {
   
    var guess = String.fromCharCode(event.keyCode).toLowerCase();
    console.log("User guess: " + guess);

    /* Is guess a valid letter? If so carry on, else display error message
     Use indexOf() to search for 'guess' in a string. (If it returns -1, the value to search for never occurs.) */
    if (availableLetters.indexOf(guess) > -1) {
      // Has it been guessed (missed or matched) already? If so, abadon & add notice
      if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
        output.innerHTML = messages.guessed;
      } else if (currentWord.indexOf(guess) > -1) {
        // Does guess exist in current word? 

        // add letter guessed to an answer array
        for (var i = 0; i < currentWord.length; i++) {
          if (currentWord[i] === guess) {
            answerArray[i] = guess;
            console.log("Current answerArray is " + answerArray);
            currentWordDisplay.innerHTML = answerArray.join(" ");
            output.innerHTML = messages.correct;
          }
        }

        // check if letter appears multiple time 
        for (var j = 0; j < currentWord.length; j++) {
          if (currentWord.charAt(j) === guess) {
            numLettersMatched += 1;
          }
        }

        lettersMatched += guess;
        console.log("Letters Matched: " + lettersMatched);
        if (numLettersMatched === currentWord.length) {
            // remove the word that already played out of the 'words' array
            words.splice(words.indexOf(`${currentWord}`), 1);
            replaceImg();
            showCountryName();
            wins++;
            numOfWins.innerHTML = wins;
            endGame(true);
          }

        

      } else {
        // guess doesn't exist in current word and hasn't been guessed before, add to letterGuessed, reduce lives, and update user
        lettersGuessed += guess;
        lettersGuessedArray.push(guess);
        console.log("Letters Guessed: " + lettersGuessed);
        console.log(lettersGuessedArray);
        var letterGuessedUppercase = lettersGuessedArray.map(function toUpper(item) {
          return item.toUpperCase();
        });
        lettersGuessedDisplay.innerHTML = letterGuessedUppercase.join(" ");
        output.innerHTML = messages.wrong;
        lives--;
        remainingGuesses.innerHTML = lives;
        if (lives === 0) {
          endGame(false);
        } else {
          gameRound();
          return;
        }
      }
    } else {
      output.innerHTML = messages.validLetter;
    }
  };
};

