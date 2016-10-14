var timer = 1;
var sec = 0;
var min = 0;
var SD,AD;
var addtimeSec = 15;

//---------------- CODE TO RESET VIEW FOR NEW GAME----------------
function setNewView() {

    window.clearTimeout(SD);
    window.clearTimeout(AD);
	var tblContent = '<tr><td> <input id="txtGuess0" type="text" maxlength="4" placeholder="Chance 1" onblur="guess(this);" onkeypress="return runScript(event,this)" autofocus/> </td><td id="indicate0"> </td></tr><tr><td> <input id="txtGuess1" type="text" maxlength="4" placeholder="Chance 2" onblur="guess(this);" onkeypress="return runScript(event,this)" disabled/> </td><td id="indicate1"> </td></tr>';

	
    displayContent("gameHeart",tblContent,0,"flipInY");
    displayContent("spanChance","10",0,"fadeIn");

	$("span").css("backgroundColor","");
    $("span").removeClass("animated hinge");
    effect("suggestion","slideInRight");
    

	$("#divFail").css("display","none");

	$("#divResult").html("");
    
    var score = window.localStorage.getItem("score");
    if(score!=null) {
        displayContent("spanScore",score,0,"fadeIn");
    }
    else {
        displayContent("spanScore","0",0,"fadeIn");
    }

    displayContent("minutes","00",0,"fadeIn");
    displayContent("seconds","00",0,"fadeIn");

    timer = 1;
    sec = 0;
    min = 0;
    runTimer();

}
//--------------------------------------------------------------

function showAnswer() {

	var result = "<br/> Sorry! You Lost! The Challenged word is <a target='blank' href='http://www.thefreedictionary.com/" + word + "' style='color:black;'><b>" + word + "</b></a><br/><a onclick='newGame();'>Want to Try Again?</a>";
	$("#divResult").html(result);
    effect("divResult","flipInX");
	document.getElementById("divFail").style.display = "none";
    window.clearTimeout(SD);

}


function displayWin(result,txt,chance) {

    window.clearTimeout(SD);
    result.innerHTML = "<b>Wow! It's Correct! It's <a href='http://www.thefreedictionary.com/"+txt.value+"'>" + txt.value + "</a></b>";
    result.style.color = "green";
    txt.disabled = true;
    txt.style.border = "solid black";
    txt.style.fontWeight = "bold";
    txt.style.backgroundColor = "yellow";
    txt.style.color = "green";
    txt.value = txt.value.toUpperCase();
    setScore();
    effect(txt.id,"flash");
    
    for(var i=0;i<chance;i++) {
        if((document.getElementById("txtGuess"+i)!=null)&&(document.getElementById("txtGuess"+i).value.length!=4)){
            document.getElementById("txtGuess"+i).style.display = "none";
        }
    }
    
    
}


function colorLetters(gword,bull,cow) {
    
    for(i=0;i<gword.length;i++) {
        var span = document.getElementById(gword[i]);
        if((bull==0)&&(cow==0)) {
            span.style.backgroundColor = "red";
            effect(span.id,"hinge");
            
        }
        else if(bull!=0) {
            if((span.style.backgroundColor!="red")) {
                span.style.backgroundColor = "green";
            }
        }
        else if(cow!=0) {
            if((span.style.backgroundColor!="red") && (span.style.backgroundColor!="green")) {
                span.style.backgroundColor = "yellow";
            }
        }
    }
    
}


function displayContent(element,text,type,animation) {

    if(type==0) {
        $("#" + element).html(text);
    }
    else {
        $("#" + element).append(text);
    }
    
    if(animation!=undefined) {
        effect(element,animation);
    }
    
}

function effect(element,animation,secs) {

    $("#" + element).addClass("animated " + animation);
    
    if(secs!=undefined) {
        setTimeout(function(){
               if(animation!="hinge"){
               $("#" + element).removeClass("animated " + animation);
               }
               },secs);
    }

    else {
        setTimeout(function(){
               if(animation!="hinge"){
               $("#" + element).removeClass("animated " + animation);
               }
               },1000);
    }
    

}


function loadSucess() {
    
    effect("divLoad","fadeOut");
    document.getElementById("divLoad").style.display = "none";
    effect("divBody","fadeIn");
    document.getElementById("divBody").style.display = "block";

}


function lastchance() {

    window.clearTimeout(SD);
    document.getElementById("divFail").style.display = "block";
    addtimeSec = 15;
    runAddTime();
}

function runTimer() {

   

    if(sec != -1) {


        SD = window.setTimeout(function(){
               

                if(sec==59) {
                    displayContent("seconds","00",0);
                    sec = 0;

                    if(min==14) {
                        displayContent("minutes","15",0);
                        sec = -1;
                        document.activeElement.disabled="true";
                        showAnswer();
                        displayContent("divResult","<br/><br/><h4>Time Out!</h4>");
                    }
                    else {
                        min = min + 1;
                        if(min<10) {
                            displayContent("minutes","0"+min,0);
                        }
                        else {
                            displayContent("minutes",min,0);
                        }
                        
                    }
                }
                else {
                    sec = sec+1;
                    if(sec<10) {
                        displayContent("seconds","0"+sec,0);
                    }
                    else {
                        displayContent("seconds",sec,0);
                    }
                    
                }
                

                runTimer();

               },1000);

        if((sec>29) && (min==14)) {
             effect("time","flash",800);
        }
    }

}

function runAddTime(key) {

    if(key!=0) {

    if(addtimeSec>0) {
    displayContent("ch_seconds",addtimeSec,0);

    AD = window.setTimeout(function(){
               
                addtimeSec--;

                if(addtimeSec<10) {
                    displayContent("ch_seconds","0"+addtimeSec,0);
                }

                else {
                    displayContent("ch_seconds",addtimeSec,0);
                }


                runAddTime();

               },1000);
    }

    else {
        window.clearTimeout(AD);
        showAnswer();
    }
    }

    else {
        window.clearTimeout(AD);
    }



}






