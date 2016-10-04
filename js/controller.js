
var bull, cow, count, win, chance;
var word;


function guess(txt) {
    
    
    var result = document.getElementById("indicate" + (count-1));
    var gword = txt.value.toLowerCase();
    bull = 0;
    cow = 0;
    var i,j,k;
    var next = count + 1;
    
    var appendText = '<tr id="row' + (count+1) + '"><td> <input id="txtGuess' + (count+1) + '" type="text" maxlength="4" placeholder="Chance ' + (count+2) + '" onblur="guess(this);" onkeypress="return runScript(event,this)" disabled/> </td><td id="indicate' + (count+1) + '"> </td></tr>'
    
    if(gword.length == 4) {
        
        if(spellcheck(gword)) {
            displayContent(result.id,"Enter a proper word",0,"shake");
            txt.focus();
        }
        else {
            
            //------------------------ CORRECT GUESS ---------------------------
            if(gword == word) {
                win = 1;
                displayWin(result,txt,chance,count)
            }
            //-----------------------------------------------------------------
            
            
            
            else {
                
                if(document.getElementById("txtGuess"+count)!=null) {
                    document.getElementById("txtGuess"+count).disabled = false;
                    document.getElementById("txtGuess"+count).focus();
                }
                
                count++;
                var val=bullcow(gword,word);
                bull = val[0];
                cow = val[1];
                
                
                //------------------ ENABLING NEXT CHANCE -------------------------
                if(next<chance) {
                    displayContent("gameHeart",appendText,1);
                    effect("row"+(count),"fadeInDown");
                }
                
                //-----------------------------------------------------------------
                
                
                //---------------------- DISPLAY RESULT ---------------------------
                txt.disabled = true;
                var inner = bull + " Bull, " + cow + " Cow";
                displayContent(result.id,inner,0,"bounceInLeft");
                displayContent("spanChance",(chance-(count-1)),0,"fadeIn");
                //-----------------------------------------------------------------
                
                
                
                
                
                //---------------------- COLORING CODES ---------------------------
                colorLetters(gword,bull,cow);
                //-----------------------------------------------------------------
                
                
                //------------------- FINAL WRONG GUESS RESULT --------------------
                if(((count)==(chance+1)) && (gword.length==4)) {
                    document.getElementById("divFail").style.display = "block";
                }
                //-----------------------------------------------------------------
                
            }
            
        }
        
        
    }
    
    else if((txt.value.length == 0) && (result!=null) && (win==0)) {
        displayContent(result.id,"Enter a 4 letter word",0,"shake");
        txt.focus();
    }
    
    
    else {
        txt.focus();
        if((document.getElementById("txtGuess" + (next-1))!=null) && (win==0)) {
            displayContent(result.id,"Enter a 4 letter word",0,"shake");
        }
    }
}



function setmoreChance() {
    
	chance = chance+5;
	$("#divFail").css("display","none");
	var appendText = '<tr><td> <input id="txtGuess' + (count) + '" type="text" maxlength="4" placeholder="Chance ' + (count) + '" onblur="guess(this);" onkeypress="return runScript(event,this)"/> </td><td id="indicate' + (count) + '"> </td></tr>';
	appendText += '<tr><td> <input id="txtGuess' + (count+1) + '" type="text" maxlength="4" placeholder="Chance ' + (count+1) + '" onblur="guess(this);" onkeypress="return runScript(event,this)" disabled/> </td><td id="indicate' + (count+1) + '"> </td></tr>';
    displayContent("gameHeart",appendText,1);
	$("#txtGuess" + count).trigger("focus");
    count++;
    
}



function setinitialValues(newWord) {
    
    count = 1;
	chance = 10;
	win = 0;
    word = newWord;
    
}


function getwin() {
    return win;
}









