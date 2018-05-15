var playing = false;
var score;
var timeRemaining;
var correctAnswer;
var correctPosition;
document.getElementById("startrest").onclick = function(){
    if (playing){ // when playing, if user click the reset, we will just reload this page
        location.reload(); 
    } else {
        playing = true;
        score = 0;
        updateInnerHTML("scoreValue",score);
        displayDiv("time");
        updateInnerHTML("startrest","Reset Game");
        updateInnerHTML("scoreValue",score);
      
        
        timeRemaining = 20;
    
        updateInnerHTML("timeremianingvalue",timeRemaining);
        
        startCountdown();
        generateQA();
        
        
    }
    
}

for (var boxNumber = 1; boxNumber < 5; boxNumber++){
    document.getElementById("box" + boxNumber).onclick = function(){
        if (playing == true){
            if(this.innerHTML == correctAnswer){
                score++;
                updateInnerHTML("scoreValue",score);
                displayDiv("correct");
                setTimeout(function(){
                    hideDiv("correct");
                },1000);
            } else {
                 displayDiv("wrong");
                setTimeout(function(){
                    hideDiv("wrong");
                    },1000);
            }
        }
        generateQA();
    }
}
function startCountdown(){
    action = setInterval(function(){
        timeRemaining -= 1;
        document.getElementById("timeremianingvalue").innerHTML = timeRemaining;
        
        if (timeRemaining == 0){
            stopCountdown();
        }
    }, 1000);
}

function stopCountdown(){
    clearInterval(action);
    displayDiv("gameOver");
    updateInnerHTML("gameOver","<p>Game Over!</p><p>Your Score is "+ score +"<p/>")
     hideDiv("time");
    
}

function updateInnerHTML(id, content){
     document.getElementById(id).innerHTML = content;
}

function hideDiv(id){
     document.getElementById(id).style.display = "none";
}

function displayDiv(id){
     document.getElementById(id).style.display = "block";
}

function generateQA(){
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    updateInnerHTML("question", x + "*" + y);
    correctPosition = 1 + Math.round(3 * Math.random());
    
    updateInnerHTML("box"+correctPosition,correctAnswer );
    
    for (var i = 1; i < 5; i++){
        if (i !== correctPosition){
            var wrongAnwser = undefined;
            while (wrongAnwser == undefined || wrongAnwser == correctAnswer){
                wrongAnwser = 1 + Math.round(9 * Math.random()) * 1 + Math.round(9 * Math.random());
            }
            updateInnerHTML("box"+i,wrongAnwser );
        }
    }
}