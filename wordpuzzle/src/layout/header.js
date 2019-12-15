import React from 'react';
import Modal from './modal.js'

export default class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalActive: false
    }
  }
  
  render() {
    return (
      <header className="App-header">
          <div className="coins">{this.props.coins}</div>
          <div className="title">Code Game</div>
          <div className="sub-title">
            <button className="link" onClick={() => this.props.onStart('easy')}>Easy</button>
            <button className="link" onClick={() => this.props.onStart('medium')}>Medium</button>
            <button className="link" onClick={() => this.props.onStart('hard')}>Hard</button>
          </div>
          <div className="menu" onClick={() => this.setState({modalActive: true})}>
          </div>
          {this.constructModal()}
      </header>
    );
  }

  constructModal() {
    if(this.state.modalActive) {
      return (
        <Modal className="header-menu"
          onClose={(e) => this.setState({modalActive: false})}>
          <div onClick={() => this.home()}>Home</div>
          <div onClick={() => this.reload()}>Reload</div>
          <div onClick={() => this.showLetters()} className="hide-on-big">{(this.props.togglePanel)? 'Hide' : 'Show'} Letters</div>
        </Modal>
      );
    }
  }

  home() {
    this.setState({modalActive: false});
    this.props.reloadGame(false);
  }

  reload() {
    this.setState({modalActive: false});
    this.props.reloadGame();
  }

  showLetters() {
    this.setState({modalActive: false});
    this.props.updateSingleState('togglePanel', !this.props.togglePanel);
  }
}
