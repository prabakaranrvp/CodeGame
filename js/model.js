
var word;
var all;


$(document).ready(function(){

                  //------------------- GETTING THE DICTIONARY WORDS --------------------------------
                  $.ajax({
                         url: "list.html",
                         dataType: "html",
                         success: function (data) {
                            if (data.length>0) {
                                all = data.split("\n");
                                newGame();
                                loadSucess();
                            }
                         },
                         error: function (model, response) {
                         alert("error");        }
                         });
                  //---------------------------------------------------------------------------------
                  
                  
              

});

//-------------------------- CHOSING A RANDOM WORD ----------------------------------

function newGame() {
    
    setWord();
	setinitialValues(word);
    setNewView();
    
}


function setWord() {
    var random = Math.floor(Math.random() * ((all.length-1) - 0+ 1)) + 0;
    word = all[random].replace(/\s+/g,"");
    
    if(word.length!=4) {
        setWord();
    }
    
}
//------------------------------------------------------------------------------------



//---------------- SPELL CHECK -------------------------
function spellcheck(text) {
    for(var i=0; i<all.length; i++) {
        if(text == all[i].replace(/\s+/g,"")) {
            return false;
        }
    }
    return true;
}
//------------------------------------------------------







//--------------------- BULL, COW CALUCULATION --------------------

function bullcow(gword,word) {
    
    gword = gword.split('');
    var cword = word.split('');
    var i,j,bull,cow;
    bull = 0;
    cow = 0;
    
    for(i=0;i<4;i++) {
        for(j=0;j<4;j++) {
            
            if(gword[i] == cword[j]) {
                if(i==j) {
                    bull++;
                }
                else {
                    cow++;
                }
            }
        }
    }
    var val = [bull,cow];
    return val;
    
}

//-----------------------------------------------------------------





function setScore(count) {
    
	var score=0;
    count++;
	if(window.localStorage.getItem("score")!=null) {
		score = parseInt(window.localStorage.getItem("score"));
	}
    
	if(count<11) {
        score += (100/count);
        
        if((100%count)>0) {
            score++;
        }
    }
    
    else {
        score += (80/count);
        
        if((80%count)>0) {
            score++;
        }
    }
    
    if(score<5) {
        score = 5;
    }
 
    score = score.toFixed(0);
 
	window.localStorage.setItem("score",score);
    displayContent("spanScore",window.localStorage.getItem("score"),0,"fadeIn");
    
}


function addChances() {
    
	var score = window.localStorage.getItem("score");
    
	if(score>=5) {
		score = score - 5;
		setmoreChance();
		window.localStorage.setItem("score",score);
		displayContent("spanScore",window.localStorage.getItem("score"),0,"fadeIn");
	}
    
	else {
		var text = "You Do not have enough coins. <br/><b>You need atleast 5 coins to add chances.</b><br/> Play and win to get coins";
        displayContent("divResult",text,0,"fadeIn");
	}
    
}


function runScript(e,txt) {
    if (e.keyCode == 13) {
        txt.blur();
    }
}





