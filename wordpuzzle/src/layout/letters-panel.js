/* eslint-disable no-loop-func */
import React from 'react';
import Modal from './modal.js'
import '../style/app.scss';
import { LETTERS } from '../constants.js'

// TODO: Styles for Panel Switch button, model buttons and responsive layout

export default class LettersPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      letters: {},
      currentTarget: null,
      modalActive: false
    };
  }

  componentWillReceiveProps(newProps) {
    this.constructLetterState(newProps.results);
  }

  constructLetterState(results) {
    let letters = this.state.letters;

    if(results && Object.keys(results).length) {
      for(let word in results) {  

        word.toUpperCase().split('').map(ltr => {
          let classNames = letters[ltr] || [];
  
          if(!(results[word].cow || results[word].bull)) {
            classNames = ['drop'];
          }
          else if(!classNames.includes('drop') ) {
            if(results[word].cow && !classNames.includes('cow')) classNames.push('cow');
            if(results[word].bull && !classNames.includes('bull')) classNames.push('bull');
          }
  
          letters[ltr] = classNames;
        });
        
      } 
    } else {
      letters = {}
    }
    
    this.setState({letters: letters});
  }

  render() {
    return (
      <section id="letters-panel">
        {LETTERS.map((ltr, i) => {
          let className = (this.state.letters[ltr] !== undefined) ? 
                            this.state.letters[ltr].join(' ') : '';
          return (
            <div key={i} 
              className={`letter ${className}`}
              onClick={(e) => this.openModal(e.target)}>
              {ltr}
            </div>
          )
        })}
        {this.constructModal()}
      </section>
    );
  }

  constructModal() {
    if(this.state.modalActive) {
      return (
        <Modal 
          showClose={true} 
          title={`Mark letter '${this.state.currentValue}' as`}
          onClose={(e) => this.setState({modalActive: false})}>
          <button className="btn cow" onClick={(e) => this.updateLetter('cow')}>Cow</button>
          <button className="btn bull" onClick={(e) => this.updateLetter('bull')}>Bull</button>
          <button className="btn drop" onClick={(e) => this.updateLetter('drop')}>Removed</button>
        </Modal>
      );
    }
  }

  openModal(target) {
    this.setState({
      modalActive: true,
      currentValue: target.innerText
    })
  }

  updateLetter(className) {
    let letters = this.state.letters;
    letters[this.state.currentValue] = ['forced', className];
    this.setState({
      letters: letters,
      modalActive: false
    });
  }

}
