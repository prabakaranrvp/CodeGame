import React from 'react';
import ReactDOM from 'react-dom';
import '../style/modal.scss';

export default class Modal extends React.Component {

  constructor(props) {
    super(props);

    this.el = this.props.el || document.getElementById('wormhole');
    this.el.className += ' modal-container-active';
  }

  render() {
    return ReactDOM.createPortal(this.renderModal(), this.el);
  }
  
  renderModal() {
    return (
      <div>
        <div className="modal-overlay" onClick={(e) => this.closeOnOverlay()}></div>
        <div className='modal' >
          <div className='modal-header'>{this.props.title}</div>
          <div className='modal-body'>
            {this.props.children}
          </div>
          <div className='modal-footer'>
            {this.renderBtn('Close')}
            {this.renderBtn('Done')}
          </div>
        </div>
      </div>
    );
  }

  renderBtn(btnType) {
    if(this.props['show' + btnType]) {
      return (
        <button 
          className={`btn-${btnType}`} 
          onClick={(e) => this.props[`on${btnType}`](e)} >
          {btnType}
        </button>
      )
    }
  }
  
  closeOnOverlay(e) {
    if(!this.props['closeOnOverlay'] && typeof this.props.onClose === 'function') {
      this.props.onClose(e)
    }
  }

  componentWillUnmount(){
    this.el.className = this.el.className.replace(' modal-container-active','');
  }
}
