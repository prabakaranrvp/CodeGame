(window.webpackJsonp=window.webpackJsonp||[]).push([[2],[,,,,,,,,,function(e,t,a){},,,function(e,t,a){e.exports=a(21)},,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){var n={"./four":[10,0],"./four.js":[10,0],"./six":[11,1],"./six.js":[11,1]};function s(e){if(!a.o(n,e))return Promise.resolve().then(function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t});var t=n[e],s=t[0];return a.e(t[1]).then(function(){return a(s)})}s.keys=function(){return Object.keys(n)},s.id=20,e.exports=s},function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(6),o=a.n(r),i=(a(18),a(1)),l=a(2),c=a(4),u=a(3),d=a(5),m=a(7),h=(a(19),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).el=a.props.el||document.getElementById("wormhole"),a.el.className+=" modal-container-active",a.closeOnEsc=a.closeOnEsc.bind(Object(m.a)(a)),document.addEventListener("keydown",a.closeOnEsc,!1),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createPortal(this.renderModal(),this.el)}},{key:"renderModal",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("div",{className:"modal-overlay",onClick:function(t){return e.closeOnOverlay()}}),s.a.createElement("div",{className:"modal ".concat(this.props.className)},s.a.createElement("div",{className:"modal-header"},this.props.title),s.a.createElement("div",{className:"modal-body"},this.props.children),s.a.createElement("div",{className:"modal-footer"},this.renderBtn("Close"),this.renderBtn("Done"))))}},{key:"renderBtn",value:function(e){var t=this;if(this.props["show"+e])return s.a.createElement("button",{className:"btn-".concat(e),onClick:function(a){return t.props["on".concat(e)](a)}},e)}},{key:"closeOnOverlay",value:function(e){this.props.closeOnOverlay||"function"!==typeof this.props.onClose||this.props.onClose(e)}},{key:"closeOnEsc",value:function(e){27===e.keyCode&&"function"===typeof this.props.onClose&&this.props.onClose(e)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.closeOnEsc,!1),this.el.className=this.el.className.replace(" modal-container-active","")}}]),t}(s.a.Component)),p=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={modalActive:!1},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("header",{className:"App-header"},s.a.createElement("div",{className:"coins"},this.props.coins),s.a.createElement("div",{className:"title"},"Code Game"),s.a.createElement("div",{className:"sub-title"},s.a.createElement("button",{className:"link",onClick:function(){return e.props.onStart("easy")}},"Easy"),s.a.createElement("button",{className:"link",onClick:function(){return e.props.onStart("medium")}},"Medium"),s.a.createElement("button",{className:"link",onClick:function(){return e.props.onStart("hard")}},"Hard")),s.a.createElement("div",{className:"menu",onClick:function(){return e.setState({modalActive:!0})}}),this.constructModal())}},{key:"constructModal",value:function(){var e=this;if(this.state.modalActive)return s.a.createElement(h,{className:"header-menu",onClose:function(t){return e.setState({modalActive:!1})}},s.a.createElement("div",{onClick:function(){return e.home()}},"Home"),s.a.createElement("div",{onClick:function(){return e.reload()}},"Reload"),s.a.createElement("div",{onClick:function(){return e.showLetters()}},"Show Letters"))}},{key:"home",value:function(){this.setState({modalActive:!1}),this.props.reloadGame(!1)}},{key:"reload",value:function(){this.setState({modalActive:!1}),this.props.reloadGame()}},{key:"showLetters",value:function(){this.setState({modalActive:!1}),this.props.updateSingleState("togglePanel",!0)}}]),t}(s.a.Component),f=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e="element-inline-middle guess-",t=this.props,a=t.words,n=t.results;return s.a.createElement("div",{className:"guess-container"},a.map(function(t,a){return s.a.createElement("div",{key:a,className:"guess"},s.a.createElement("span",{className:"".concat(e,"result guess-cow")},"cow - ",n[t].cow),s.a.createElement("span",{className:"".concat(e,"word")},t),s.a.createElement("span",{className:"".concat(e,"result guess-bull")},n[t].bull," - bull"))}))}}]),t}(s.a.Component),v=(a(9),{easy:4,medium:5,hard:6}),g={easy:"four.js",medium:"four.js",hard:"six.js"},w={usedGuess:"You have already used this guess",minLength:{easy:"Please enter a 4 letter word",medium:"Please enter a 5 letter word",hard:"Please enter a 6 letter word"},validWord:'Not a valid word. <a class="link" target="_blank" href="mailto:support@codegame.in?subject=Add%20missing%20word%20-%20{word}&body=Hi,%20Please%20add%20the%20missing%20word">Report</a>'},k=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],y=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={letters:{},currentTarget:null,modalActive:!1},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.constructLetterState(e.results)}},{key:"constructLetterState",value:function(e){var t=this.state.letters;if(e&&Object.keys(e).length){var a=function(a){a.toUpperCase().split("").map(function(n){var s=t[n]||[];e[a].cow||e[a].bull?s.includes("drop")||(e[a].cow&&!s.includes("cow")&&s.push("cow"),e[a].bull&&!s.includes("bull")&&s.push("bull")):s=["drop"],t[n]=s})};for(var n in e)a(n)}else t={};this.setState({letters:t})}},{key:"render",value:function(){var e=this;return s.a.createElement("section",{id:"letters-panel"},k.map(function(t,a){var n=void 0!==e.state.letters[t]?e.state.letters[t].join(" "):"";return s.a.createElement("div",{key:a,className:"letter ".concat(n),onClick:function(t){return e.openModal(t.target)}},t)}),this.constructModal())}},{key:"constructModal",value:function(){var e=this;if(this.state.modalActive)return s.a.createElement(h,{showClose:!0,title:"Mark letter '".concat(this.state.currentValue,"' as"),onClose:function(t){return e.setState({modalActive:!1})}},s.a.createElement("button",{className:"btn cow",onClick:function(t){return e.updateLetter("cow")}},"Cow"),s.a.createElement("button",{className:"btn bull",onClick:function(t){return e.updateLetter("bull")}},"Bull"),s.a.createElement("button",{className:"btn drop",onClick:function(t){return e.updateLetter("drop")}},"Reject"),s.a.createElement("button",{className:"btn",onClick:function(t){return e.removeLetterMark()}},"Remove Marking"))}},{key:"openModal",value:function(e){this.setState({modalActive:!0,currentValue:e.innerText})}},{key:"updateLetter",value:function(e){var t=this.state.letters;t[this.state.currentValue]=["forced",e],this.setState({letters:t,modalActive:!1})}},{key:"removeLetterMark",value:function(){var e=this.state.letters;e[this.state.currentValue]=[],this.setState({letters:e,modalActive:!1})}}]),t}(s.a.Component),E=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return this.props.won?this.renderWonMessage():this.renderInputContainer()}},{key:"renderInputContainer",value:function(){var e=this.props.chances-this.props.guessedWords.length,t=s.a.createElement("label",{htmlFor:"txt-guess"},"You have ",s.a.createElement("strong",null,e)," chances left");return 0===e&&(t=s.a.createElement("label",null,"You have used all your chances")),s.a.createElement("div",{className:"game__input-container"},t,this.renderInput(e),this.renderError())}},{key:"renderInput",value:function(e){var t=this,a=v[this.props.difficulty],n="";return this.props.animateAddIcon&&(n="animate-add",setTimeout(function(){t.props.updateSingleState("animateAddIcon",!1)},1e3)),e>0?s.a.createElement("div",{className:"reply-container"},s.a.createElement("button",{className:"btn-toggle-panel",onClick:function(e){return t.props.updateSingleState("togglePanel",!t.props.togglePanel)}},"A"),s.a.createElement("input",{id:"txt-guess",type:"text",autoComplete:"off",autoFocus:!0,maxLength:a,placeholder:"Guess ".concat(a," letter word"),onKeyUp:function(e){return t.checkForAddition(e)}}),s.a.createElement("button",{className:"btn-add ".concat(this.props.animateInputClass+" "+n),onClick:function(){return t.props.addGuess()}},s.a.createElement("div",null))):this.props.coins>=5&&!this.props.showResult?this.renderAddChances():this.renderResult()}},{key:"renderAddChances",value:function(){var e=this;return s.a.createElement("div",{className:"add-chances-container"},s.a.createElement("span",{className:"add-chance",onClick:function(t){return e.props.addChance()}},"Add 5 more chances for 5 coins "),"or",s.a.createElement("span",{className:"show-answer",onClick:function(t){return e.props.updateSingleState("showResult",!0)}},"Show answer?"))}},{key:"renderError",value:function(){return this.props.errorMsg.length?s.a.createElement("span",{className:"animated fadeInDown fast",dangerouslySetInnerHTML:{__html:this.props.errorMsg}}):s.a.createElement("span",{className:"element-inline-middle soft-hide"},"No Errors")}},{key:"renderWonMessage",value:function(){return s.a.createElement("div",{className:"won-message"},s.a.createElement("span",{className:"element-inline-middle"},"WOW! You guessed is right!!! It is "),s.a.createElement("a",{className:"element-inline-middle link animated flash",href:"https://www.thefreedictionary.com/".concat(this.props.word),target:"_blank"},this.props.word.toUpperCase()))}},{key:"renderResult",value:function(){var e=this;return s.a.createElement("div",{className:"result-container"},s.a.createElement("span",{className:"result"},"The word is "),s.a.createElement("a",{className:"result link",href:"https://www.thefreedictionary.com/".concat(this.props.word),target:"_blank"},this.props.word.toUpperCase()),s.a.createElement("div",{className:"link",onClick:function(t){return e.props.reloadGame()}},"Retry again?"))}},{key:"checkForAddition",value:function(e){13===e.keyCode&&this.props.addGuess()}}]),t}(s.a.Component),b=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).guessResults={},a.state={gameMode:!1,difficulty:null,word:"",won:!1,coins:parseInt(window.localStorage.getItem("coins"))||0,guessedWords:[],chances:10,showResult:!1,animateInputClass:"animated",errorMsg:"",togglePanel:!1,animateAddIcon:!1},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"setGameMode",value:function(e){var t=this;a(20)("./"+g[e]).then(function(a){t.words=a.words,t.setState({gameMode:!0,difficulty:e,word:t.setWord()})})}},{key:"setWord",value:function(){return this.words[parseInt(Math.random()*this.words.length)].toLowerCase()}},{key:"reloadGame",value:function(e){var t=this.state,a=t.won,n=t.chances,s=t.guessedWords,r=n-this.state.guessedWords.length;if(!(s.length&&!a&&r)||window.confirm("Do you want leave this game and start fresh?")){var o=document.getElementById("txt-guess");o&&(o.value=""),this.guessResults={},this.setState({word:this.setWord(),guessedWords:[],won:!1,chances:10,showResult:!1,togglePanel:!1,gameMode:void 0===e||e})}}},{key:"updateSingleState",value:function(e,t){var a={};a[e]=t,this.setState(a)}},{key:"updateStateJson",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"App gamemode-"+(this.state.gameMode?"on":"off")},s.a.createElement(p,{coins:this.state.coins,onStart:function(t){e.setGameMode(t)},reloadGame:function(t){return e.reloadGame(t)},updateSingleState:function(t,a){return e.updateSingleState(t,a)}}),s.a.createElement("div",{className:"game ".concat(this.state.togglePanel?"toggle-to-letters":null)},s.a.createElement("div",{className:"dummy"}),s.a.createElement(y,{results:this.guessResults}),s.a.createElement(f,{words:this.state.guessedWords,results:this.guessResults}),s.a.createElement(E,Object.assign({addGuess:function(t){return e.addGuess(t)},reloadGame:function(){return e.reloadGame()},updateSingleState:function(t,a){return e.updateSingleState(t,a)},updateStateJson:function(t){return e.updateStateJson(t)},addChance:function(){return e.addChance()}},this.state))),s.a.createElement("div",{id:"wormhole"}))}},{key:"componentDidUpdate",value:function(){setTimeout(function(){document.getElementsByClassName("guess-container")[0].scrollTop+=500},100)}},{key:"addGuess",value:function(){var e=document.getElementById("txt-guess").value.toLowerCase();if(this.validateGuess(e)&&this.getBullCow(e)){var t=this.state.guessedWords;t.push(e),this.setState({guessedWords:t,animateAddIcon:!0,togglePanel:!1}),document.getElementById("txt-guess").value=""}}},{key:"validateGuess",value:function(e){var t=this,a=this.validationRules(e.toLowerCase());if(a.usedGuess||a.minLength||a.validWord){var n;for(var s in a)if(a[s]){n=s;break}var r=w[n];return r="string"===typeof r?r.replace("{word}",e):r[this.state.difficulty],this.setState({animateInputClass:"animated shake fast",errorMsg:r,togglePanel:!1}),setTimeout(function(){t.setState({animateInputClass:"animated"})},600),!1}return this.setState({errorMsg:""}),!0}},{key:"validationRules",value:function(e){return{minLength:e.trim().length<v[this.state.difficulty],validWord:this.words.indexOf(e)<0,usedGuess:this.state.guessedWords.indexOf(e.trim())>-1}}},{key:"getBullCow",value:function(e){var t=e.toLowerCase(),a=t.length,n=0,s=0;if(t===this.state.word)return this.setState({won:!0,coins:this.state.coins+5}),this.updateCoinsInfo(this.state.coins+5),!1;for(var r=0;r<a;r++)t[r]===this.state.word[r]&&n++,-1!==this.state.word.indexOf(t[r])&&this.state.word.indexOf(t[r])!==r&&s++;return this.guessResults[e]={bull:n,cow:s},!0}},{key:"addChance",value:function(){this.state.coins>=5&&(this.setState({coins:this.state.coins-5,chances:this.state.chances+5}),this.updateCoinsInfo(this.state.coins-5))}},{key:"updateCoinsInfo",value:function(e){window.localStorage.setItem("coins",e)}}]),t}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[12,3,4]]]);
//# sourceMappingURL=main.f46f38ff.chunk.js.map