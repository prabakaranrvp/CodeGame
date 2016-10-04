
//---------------- CODE TO RESET VIEW FOR NEW GAME----------------
function setNewView() {

	var tblContent = '<tr><td> <input id="txtGuess0" type="text" maxlength="5" placeholder="Chance 1" onblur="guess(this);" onkeypress="return runScript(event,this)" autofocus/> </td><td id="indicate0"> </td></tr><tr><td> <input id="txtGuess1" type="text" maxlength="5" placeholder="Chance 2" onblur="guess(this);" onkeypress="return runScript(event,this)" disabled/> </td><td id="indicate1"> </td></tr>';

	
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

}
//--------------------------------------------------------------

function showAnswer() {

	var result = "<br/> Sorry! You Lost! The Challenged word is <a target='blank' href='http://www.thefreedictionary.com/" + word + "' style='color:black;'><b>" + word + "</b></a><br/><a onclick='newGame();'>Want to Try Again?</a>";
	$("#divResult").html(result);
    effect("divResult","flipInX");
	document.getElementById("divFail").style.display = "none";
    if((window.localStorage.getItem("score")!=null)&&(window.localStorage.getItem("score")!=0)) {
        var temp = parseInt(window.localStorage.getItem("score"))-2;
        window.localStorage.setItem("score",temp);
    }

}


function displayWin(result,txt,chance) {
    
    result.innerHTML = "<b>Wow! It's Correct!</b>";
    result.style.color = "green";
    txt.disabled = true;
    txt.style.border = "solid black";
    txt.style.fontWeight = "bold";
    txt.style.backgroundColor = "yellow";
    txt.style.color = "green";
    txt.value = txt.value.toUpperCase();
    setScore(count);
    effect(txt.id,"flash");
    
    for(var i=count;i<chance;i++) {
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

function effect(element,animation) {

    $("#" + element).addClass("animated " + animation);
    
    setTimeout(function(){
               if(animation!="hinge"){
               $("#" + element).removeClass("animated " + animation);
               }
               },1000);

}


function loadSucess() {
    
    effect("divLoad","fadeOut");
    document.getElementById("divLoad").style.display = "none";
    effect("divBody","fadeIn");
    document.getElementById("divBody").style.display = "block";

}








