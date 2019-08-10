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
      guessedWords: new Array(),
      chances: 10,
      animateInputClass: 'animated',
      errorMsg: ''
    };
  }
  
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
    this.guessResults = {};
    this.setState({
      word: this.setWord(),
      guessedWords: new Array()
    })
  }
  
  render() {
    let chances = this.state.chances - this.state.guessedWords.length;
    console.log((this.words)?this.words.length:0);
    return (
      <div className={"App gamemode-" + (this.state.gameMode?"on":"off")}>
        <Header coins={0} onStart={(difficulty) => {this.setGameMode(difficulty)}} reloadGame={()=>this.reloadGame()} />
        <div className="game">
          <div>
            {this.state.guessedWords.map((word, i) => {
              return (<div key={i} class="animated fadeInUpBig fast delay-0s">{word} {this.guessResults[word].cow}-cow {this.guessResults[word].bull}-bull</div>)
            })}
          </div>
          <div className="game__input-container">
            <label htmlFor="txt-guess">You have {chances} chances left</label>
            {this.renderInput(chances)}
            {this.renderError()}
          </div>
          
        </div>
      </div>
    );
  }
  
  renderInput(chances) {
    if(chances > 0) {
        return (<input id="txt-guess" class={this.state.animateInputClass} type="text" autoComplete="off" autoFocus={true} maxLength={difficultyMapping[this.state.difficulty]} placeholder="Your Guess..." onKeyUp={(e) => this.addGuess(e)} />);
    } else return null;
  }
  
  renderError(){
    if(this.state.errorMsg.length) {
      return (<span class="animated fadeInDown fast">{this.state.errorMsg}</span>)
    }
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
    let guessedWords = this.state.guessedWords;
    // if((guessedWords.indexOf(guess) > -1) || (guess.length < difficultyMapping[this.state.difficulty]) || (this.words.indexOf(guess) < 0)) {
    let validations = this.validationRules(guess.toLowerCase());
    if (validations.usedGuess || validations.minLength || validations.validWord) {
      let errorMsgKey;
      console.log(validations)
      for(let validKey in validations) {
        console.log(validKey, validations[validKey]);
        if(validations[validKey]) {
          errorMsgKey = validKey;
          break;
        }
      }
      console.log(errorMessage[errorMsgKey]);
      this.setState({
        animateInputClass: 'animated shake fast',
        errorMsg: errorMessage[errorMsgKey]
      });
      setTimeout(() => {this.setState({animateInputClass: 'animated'})}, 600);
      return false;
    } else {
      this.setState({
        errorMsg: ''
      })
      return true;
    }
  }
  
  validationRules(guess) {
    return {
      minLength: (guess.trim().length < difficultyMapping[this.state.difficulty]),
      validWord: (this.words.indexOf(guess) < 0),
      usedGuess: (this.state.guessedWords.indexOf(guess.trim()) > -1)
    }
  }
  
  getBullCow(guessTxt) {
    let guess = guessTxt.toLowerCase();
    let len = guess.length, bull = 0, cow = 0;
    if(guess == this.state.word) {
        this.setState({GameMode:false, won: true});
    }
    for(let i=0; i<len; i++) {
        // Check for Bull
        if(guess[i]==this.state.word[i])
            bull++;
        if(this.state.word.indexOf(guess[i]) != -1 && this.state.word.indexOf(guess[i]) != i)
            cow++;
    }
    this.guessResults[guessTxt] = {bull: bull, cow: cow};
  }
}


