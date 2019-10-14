/*
  TODO:
    1. Add Medium difficulty (5 letter words)
    2. Build Letters Panel Component
    3. Add send button next to textbox
    4. Add more Specific styling for results, adding chances, won message
    5. Way to switch back to home page - to chose difficulty
*/

import React from 'react';
import Header from './layout/header.js'
import './App.scss';
import { DIFFICULTY_MAP, DIFFICULTY_FILE_MAP, ERROR_MSG } from './constants.js'

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
      guessedWords: [],
      chances: 10,
      showResult: false,
      animateInputClass: 'animated',
      errorMsg: ''
    };
  }
  
  // Imports the words based on the difficulty level
  setGameMode(difficulty) {
    import("./words/" + DIFFICULTY_FILE_MAP[difficulty]).then(arrWords => {
      this.words = arrWords.words;
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
        showResult: false
      });

    }
  }
  
  render() {
    return (
      <div className={"App gamemode-" + (this.state.gameMode?"on":"off")}>
        <Header coins={this.state.coins} onStart={(difficulty) => {this.setGameMode(difficulty)}} reloadGame={()=>this.reloadGame()} />
        <div className="game">
            <div className="dummy"></div>
            <div className="guess-container" >
              {this.state.guessedWords.map((word, i) => {
                return (
                  <div key={i} className="guess" >
                      <span className="element-inline-middle guess-result guess-cow">
                        cow - {this.guessResults[word].cow}
                      </span>
                      <span className = "element-inline-middle guess-word"> 
                        {word} 
                      </span>
                      <span className="element-inline-middle guess-result guess-bull">
                        {this.guessResults[word].bull} - bull 
                      </span>
                      
                  </div>
                )
              })}
            </div>
          
          {this.state.won? this.renderWonMessage() : this.renderInputContainer()}
        </div>
      </div>
    );
  }

  renderInputContainer() {
    let chances = this.state.chances - this.state.guessedWords.length;

    let chancesText = (<label htmlFor="txt-guess">
                        You have <strong>{chances}</strong> chances left
                      </label>);

    if(chances === 0)
      chancesText = (<label>You have used all your chances</label>);

    return (
      <div className="game__input-container">
        {chancesText}
        {this.renderInput(chances)}
        {this.renderError()}
      </div>
    );
  }
  
  renderInput(chances) {
    let maxLength = DIFFICULTY_MAP[this.state.difficulty];
    if(chances > 0) {
        return (
          <input id="txt-guess" 
            className={this.state.animateInputClass} 
            type="text" 
            autoComplete="off" 
            autoFocus={true} 
            maxLength={maxLength} 
            placeholder={`Guess ${maxLength} letter word`}
            onKeyUp={(e) => this.addGuess(e)} />)
        ;
    } else if (this.state.coins >= 5 && !this.state.showResult) {
      return this.renderAddChances();
    } else {
      return this.renderResult();
    }
  }

  renderAddChances() {
    return (
        <div> 
          <span onClick={(e) => this.addChance()}>Add 5 more chances for 5 coins </span>
          or
          <span onClick={(e) => this.setState({showResult: true})}>Show answer?</span>
        </div>
    );
  }
  
  renderError(){
    return (this.state.errorMsg.length) ?
       (<span className="animated fadeInDown fast" dangerouslySetInnerHTML={{__html: this.state.errorMsg}} ></span>) :
       (<span className="element-inline-middle soft-hide">No Errors</span>);
  }

  renderWonMessage() {
    return (
      <div className="won-message">
        <span className="element-inline-middle">WOW! You guessed is right!!! It is </span>
        <a className="element-inline-middle link" 
          href={`https://www.thefreedictionary.com/${this.state.word}`} 
          target="_blank">
          {this.state.word.toUpperCase()}
        </a>
      </div>
    )
  }

  renderResult() {
    return (
      <div className="result">
        <span className="element-inline-middle">You missed your chances! The word is </span>
        <a className="element-inline-middle" href={`https://www.thefreedictionary.com/${this.state.word}`} target="_blank">
          {this.state.word.toUpperCase()}
        </a>
        <div onClick={(e) => this.reloadGame()}>Retry again?</div>
      </div>
    )
  }

  componentDidUpdate() {
    setTimeout(() => {
      document.getElementsByClassName('guess-container')[0].scrollTop += 500;
    }, 100);
  }
  
  addGuess(e) {
    if(e.keyCode === 13) {
      let currGuess = document.getElementById('txt-guess').value.toLowerCase();
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
        errorMsg: (ERROR_MSG[errorMsgKey]).replace('{word}', guess)
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
      minLength: (guess.trim().length < DIFFICULTY_MAP[this.state.difficulty]),
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


