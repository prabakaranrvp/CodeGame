/* eslint-disable no-loop-func */
import React from 'react';
import Modal from './modal.js'
import '../style/app.scss';


export default class Help extends React.Component {
  
  render() {
    return (
      <Modal 
        showClose={true} 
        title="How to Play - Bull Cow"
        className="how-to-modal"
        onClose={() => this.props.onHelpClose()}>
          <article>
            <p>
              <strong>Bull</strong> - Tells that the letter in the challenged word matches exactly at the same position.
            </p>

            <p>
              Challenged Word : <strong>COD<span className="red">E</span></strong>
            </p>

            <p>
                Guessed Word : <strong>GAM<span className="red">E</span></strong>
            </p>

            <p>
              The last letter <strong>E</strong> matches exactly at the same place. So, You will get <span className="red">1 Bull, 0 Cow</span>
            </p>
          
            <p>
              <strong>Cow</strong> - Tells that the letter in the challenged word is present in the guessed word. But that letter is in wrong position.
            </p>

            <p>
              Challenged Word : <strong>COD<span className="red">E</span></strong>
            </p>

            <p>
              Guessed Word : <strong><span className="red">D</span>AWN</strong>
            </p>

            <p>
              The last letter <strong>D</strong> matches, but it is in wrong position. So, You will get <span className="red">0 Bull, 1 Cow</span>
            </p>
        </article>
      </Modal>
    );
  }

}
