import React from 'react';

export default class GuessList extends React.Component {
  
  render() {
    let ClassPrefix = 'element-inline-middle guess-';

    let { words, results } = this.props; 

    return (
      <div className="guess-container" >
        {words.map((word, i) => {
          return (
            <div key={i} className="guess" >
              <span className={`${ClassPrefix}result guess-cow`}>
                cow - {results[word].cow}
              </span>
              <span className={`${ClassPrefix}word`}> 
                {word} 
              </span>
              <span className={`${ClassPrefix}result guess-bull`}>
                {results[word].bull} - bull 
              </span>
            </div>
          )
        })}
      </div>
    );
  }
}
