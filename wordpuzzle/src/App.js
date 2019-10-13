import React from 'react';
import Header from './layout/header.js'
import './App.scss';

const difficultyMapping = {
  'easy': 4,
  'medium': 5,
  'hard': 6
};

const difficultyFileMapping = {
  'easy': 'four.js',
  'medium': 'four.js',
  'hard': 'four.js'
};

const errorMessage = {
  'usedGuess': 'You have already used this guess',
  'minLength': {
    'easy': 'Please enter a 4 letter word',
    'medium': 'Please enter a 5 letter word',
    'hard': 'Please enter a 6 letter word',
  },
  'validWord': 'Not a valid word'
};

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.guessResults = {};
    this.state = {
      gameMode: false,
      difficulty: null,
      word: '',
      won: false,
      coins: parseInt(window.localStorage.getItem('coins')) || 0,
      guessedWords: new Array(),
      chances: 10,
      animateInputClass: 'animated',
      errorMsg: ''
    };
  }
  
  // Imports the words based on the difficulty level
  setGameMode(difficulty) {
    import("./words/" + difficultyFileMapping[difficulty]).then(arrWords => {
      this.words = arrWords.fourWords;
      this.setState({
        gameMode: true,
        difficulty: difficulty,
        word: this.setWord()
      });
    });  
  }
  
  setWord() {
    return (this.words[parseInt(Math.random() * this.words.length)]).toLowerCase();
  }
  
  reloadGame() {
    let {won, chances, guessedWords} = this.state;
    let remainingChances = chances - this.state.guessedWords.length;

    let userConfirmation = ((guessedWords.length && !won) && remainingChances) ?
                              window.confirm("Do you want leave this game and start fresh?") :
                              true;

    if (userConfirmation) {
      // Reset the textbox
      let txtGuess = document.getElementById('txt-guess');
      if (txtGuess) txtGuess.value = '';

      this.guessResults = {};
      this.setState({
        word: this.setWord(),
        guessedWords: [],
        won: false,
        chances: 10,
      });

    }
  }
  
  render() {
    return (
      <div className={"App gamemode-" + (this.state.gameMode?"on":"off")}>
        <Header coins={this.state.coins} onStart={(difficulty) => {this.setGameMode(difficulty)}} reloadGame={()=>this.reloadGame()} />
        <div className="game">
          <div>
            {this.state.guessedWords.map((word, i) => {
              return (<div key={i} class="animated fadeInUpBig fast delay-0s">{word} {this.guessResults[word].cow}-cow {this.guessResults[word].bull}-bull</div>)
            })}
          </div>
          {this.state.won? this.renderWonMessage() : this.renderInputContainer()}
        </div>
      </div>
    );
  }

  renderInputContainer() {
    let chances = this.state.chances - this.state.guessedWords.length;

    return (
      <div className="game__input-container">
        <label htmlFor="txt-guess">You have {chances} chances left</label>
        {this.renderInput(chances)}
        {this.renderError()}
      </div>
    );
  }
  
  renderInput(chances) {
    if(chances > 0) {
        return (<input id="txt-guess" class={this.state.animateInputClass} type="text" autoComplete="off" autoFocus={true} maxLength={difficultyMapping[this.state.difficulty]} placeholder="Your Guess..." onKeyUp={(e) => this.addGuess(e)} />);
    } else if (this.state.coins >= 5) {
      return this.renderAddChances();
    } else {
      return this.renderResult();
    }
  }

  renderAddChances() {
    return (
        <div onClick={(e) => this.addChance()}> Add 5 more chances for 5 coins </div>
    );
  }
  
  renderError(){
    if(this.state.errorMsg.length) {
      return (<span class="animated fadeInDown fast">{this.state.errorMsg}</span>)
    }
  }

  renderWonMessage() {
    return (
      <div className="won-message">
        WOW! You guessed is right!!! It is 
        <a href={`https://www.thefreedictionary.com/${this.state.word}`} target="_blank">{this.state.word.toUpperCase()}</a>
      </div>
    )
  }

  renderResult() {
    return (
      <div className="result">
        You missed your chances! The word is 
        <a href={`https://www.thefreedictionary.com/${this.state.word}`} target="_blank">
          {this.state.word.toUpperCase()}
        </a>
        <span onClick={(e) => this.reloadGame()}>Retry again?</span>
      </div>
    )
  }
  
  addGuess(e) {
    if(e.keyCode === 13) {
      let currGuess = document.getElementById('txt-guess').value;
      if(this.validateGuess(currGuess)) {
        this.getBullCow(currGuess);
        let guessedWords = this.state.guessedWords;
        guessedWords.push(currGuess);
        this.setState({
          guessedWords: guessedWords
        })
        document.getElementById('txt-guess').value = '';
      }
    }
  }
  
  validateGuess(guess) {
    let validations = this.validationRules(guess.toLowerCase());
    
    // Show Error if Any one of three (1/3) validation fails.
    if (validations.usedGuess || validations.minLength || validations.validWord) {
      let errorMsgKey;

      // Get the first validation error and breaks the loop
      for(let validKey in validations) {
        if(validations[validKey]) {
          errorMsgKey = validKey;
          break;
        }
      }
      
      this.setState({
        animateInputClass: 'animated shake fast',
        errorMsg: errorMessage[errorMsgKey]
      });
      setTimeout(() => {this.setState({animateInputClass: 'animated'})}, 600);
      return false;
    } 
    // Reset Error message on all validation success
    else {
      this.setState({
        errorMsg: ''
      })
      return true;
    }
  }
  
  // Returns a JSON Object for validation failures 
  // If validation fails, it returns true. Else false
  validationRules(guess) {
    return {
      minLength: (guess.trim().length < difficultyMapping[this.state.difficulty]),
      validWord: (this.words.indexOf(guess) < 0),
      usedGuess: (this.state.guessedWords.indexOf(guess.trim()) > -1)
    }
  }
  
  // Calculates the Bull and Cow Length of the give Guess
  getBullCow(guessTxt) {
    let guess = guessTxt.toLowerCase();
    let len = guess.length, bull = 0, cow = 0;
    if(guess === this.state.word) {
        this.setState({
          won: true,
          coins: (this.state.coins + 5)
        });
        this.updateCoinsInfo(this.state.coins + 5);
    }
    for(let i=0; i<len; i++) {
        // Check for Bulls
        if(guess[i] === this.state.word[i])
            bull++;

        // Check for Cows - If the letter is already added as Bull, then ignore
        if(this.state.word.indexOf(guess[i]) !== -1 && this.state.word.indexOf(guess[i]) !== i)
            cow++;
    }
    this.guessResults[guessTxt] = {bull: bull, cow: cow};
  }

  // Adding Changes using Coins - 5 for 5
  addChance() {
    if(this.state.coins >= 5) {
      this.setState({
        coins: (this.state.coins - 5),
        chances: (this.state.chances + 5)
      });
      this.updateCoinsInfo(this.state.coins - 5);
    }
  }

  // Sets the coins in Local storage
  updateCoinsInfo(coins) {
    window.localStorage.setItem('coins', coins);
  }

}


