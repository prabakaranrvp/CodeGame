import React from 'react';
import { DIFFICULTY_MAP } from '../constants.js'

export default class ReplyAndResponse extends React.Component {

  render() {
    return this.props.won? this.renderWonMessage() : this.renderInputContainer();
  }

  renderInputContainer() {
    let chances = this.props.chances - this.props.guessedWords.length;

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
    let maxLength = DIFFICULTY_MAP[this.props.difficulty];


    let animateIconClass = '';
    if(this.props.animateAddIcon){
      animateIconClass = 'animate-add';
      setTimeout(() => { this.props.updateSingleState('animateAddIcon', false) }, 1000);
    }

    if(chances > 0) {
        return (
          <div className="reply-container">
            <button 
              className="btn-toggle-panel" 
              onClick={(e) => this.props.updateSingleState('togglePanel', !this.props.togglePanel)}>
                A
            </button>
            <input id="txt-guess" 
              type="text" 
              autoComplete="off" 
              autoFocus={true} 
              maxLength={maxLength} 
              placeholder={`Guess ${maxLength} letter word`}
              onKeyUp={(e) => this.checkForAddition(e)} />
            <button 
              className={`btn-add ${this.props.animateInputClass + ' ' + animateIconClass}`}
              onClick={() => this.props.addGuess()}>
                <div></div>
            </button>
          </div>
        );
    } else if (this.props.coins >= 5 && !this.props.showResult) {
      return this.renderAddChances();
    } else {
      return this.renderResult();
    }
  }

  renderAddChances() {
    return (
        <div className="add-chances-container"> 
          <span className="add-chance" onClick={(e) => this.props.addChance()}>Add 5 more chances for 5 coins </span>
          or
          <span className="show-answer" onClick={(e) => this.props.updateSingleState('showResult', true)}>Show answer?</span>
        </div>
    );
  }
  
  renderError(){
    return (this.props.errorMsg.length) ?
       (<span className="animated fadeInDown fast" dangerouslySetInnerHTML={{__html: this.props.errorMsg}} ></span>) :
       (<span className="element-inline-middle soft-hide">No Errors</span>);
  }

  renderWonMessage() {
    return (
      <div className="won-message">
        <span className="element-inline-middle">WOW! You guessed is right!!! It is </span>
        <a className="element-inline-middle link animated flash" 
          href={`https://www.thefreedictionary.com/${this.props.word}`} 
          target="_blank">
          {this.props.word.toUpperCase()}
        </a>
      </div>
    )
  }

  renderResult() {
    return (
      <div className="result-container">
        <span className="result">The word is </span>
        <a className="result link" href={`https://www.thefreedictionary.com/${this.props.word}`} target="_blank">
          {this.props.word.toUpperCase()}
        </a>
        <div className="link" onClick={(e) => this.props.reloadGame()}>Retry again?</div>
      </div>
    )
  }

  checkForAddition(e){
    if(e.keyCode === 13) 
      this.props.addGuess();
  }
}
