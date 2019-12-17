
/* TODO: 
    * Add Medium difficulty (5 letter words)
    * Add more Specific animation styling won message
*/

import React from 'react';
import Header from './layout/header.js'
import GuessList from './layout/guess-list.js'
import LettersPanel from './layout/letters-panel.js'
import ReplyAndResponse from './layout/reply-and-response.js';
import './style/app.scss';
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
      errorMsg: '',
      togglePanel: false,
      animateAddIcon: false,
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
  
  reloadGame(gameMode) {
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
        showResult: false,
        togglePanel: false,
        gameMode: (gameMode !== undefined)?gameMode:true
      });

    }
  }

  updateSingleState(stateProp, stateVal) {
    let stateJSON = {};
    stateJSON[stateProp] = stateVal;
    this.setState(stateJSON);
  }

  updateStateJson(stateJSON) {
    this.setState(stateJSON);
  }
  
  render() {
    return (
      <div className={"App gamemode-" + (this.state.gameMode?"on":"off")}>
        <Header 
          coins={this.state.coins} 
          onStart={(difficulty) => {this.setGameMode(difficulty)}} 
          reloadGame={(arg)=>this.reloadGame(arg)}
          togglePanel={this.state.togglePanel}
          updateSingleState={(stateProp, stateVal) => this.updateSingleState(stateProp, stateVal)} />
        <div className={`game ${(this.state.togglePanel)?'toggle-to-letters':null}`}>
            <div className="dummy"></div>
            <LettersPanel results={this.guessResults} />
            <GuessList words={this.state.guessedWords} results={this.guessResults}  />

            <ReplyAndResponse 
              addGuess={(e) => this.addGuess(e)}
              reloadGame={() => this.reloadGame()}
              updateSingleState={(stateProp, stateVal) => this.updateSingleState(stateProp, stateVal)}
              updateStateJson={(stateJSON) => this.updateStateJson(stateJSON)}
              addChance={() => this.addChance()}
              {...this.state}
            />

            <div className="dummy-big"></div>
        </div>
        <div id="wormhole" />
      </div>
    );
  }

  componentDidUpdate() {
    setTimeout(() => {
      document.getElementsByClassName('guess-container')[0].scrollTop += 500;
    }, 100);
  }
  
  addGuess() {
    let currGuess = document.getElementById('txt-guess').value.toLowerCase();
    if(this.validateGuess(currGuess)) {
      if(this.getBullCow(currGuess)) {
        let guessedWords = this.state.guessedWords;
        guessedWords.push(currGuess);
        this.setState({
          guessedWords: guessedWords,
          animateAddIcon: true,
          togglePanel: false
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
      
      let errorMsg = ERROR_MSG[errorMsgKey];
      errorMsg = (typeof errorMsg === 'string') ? 
                    errorMsg.replace('{word}', guess) : 
                    errorMsg[this.state.difficulty];

      this.setState({
        animateInputClass: 'animated shake fast',
        errorMsg: errorMsg,
        togglePanel: false
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
        return false;
    }
    for(let i=0; i<len; i++) {
      let letterBulled = false, stateWord = this.state.word;
        // Check for Bulls
        if(guess[i] === stateWord[i]) {
          bull++;
          letterBulled = true;
        }
          
        // Check for Cows - If the letter is already added as Bull, then ignore
        if(stateWord.indexOf(guess[i]) !== -1 && !letterBulled) {
          cow++;
          // To Check for mulitple letters => Currenly supports only 2 letters
          if(stateWord.indexOf(guess[i]) !== stateWord.lastIndexOf(guess[i]))
            cow++;
        }    
    }
    this.guessResults[guessTxt] = {bull: bull, cow: cow};
    return true;
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


