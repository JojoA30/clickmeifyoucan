// Liste des variables // 

var btn_start = document.getElementById ("startgame") ;
var background = document.getElementById("background") ;
var clickMe = document.getElementById("clikme");
var score = document.getElementById("score");
var updateScore = 0 ;
var pointnxt = document.getElementById("nxt");
var pointfornxt = 10 ;
var level = document.getElementById("level");
var lvl = 1 ;
var miss = document.getElementById("miss");
var missclick = 0 ;
var timer = document.getElementById("timer");
var sec = 60;
var ahighscore = document.getElementById("hs") ;
var m = 300 ;
var t;
var rotatClick = 2 ;
var d = new Date();
var theDate = d.getDate() + " /" + (d.getMonth()+1) + " / " + d.getFullYear() ;
console.log(theDate);


 

//JSON //

var highscore = [
    {name : "Meir", score : 1400, date : "08/12/19"},
    {name : "Benjamin", score : 1200, date : "07/12/19"},
    {name : "Dylan", score : 1000, date : "04/12/19"},
    {name : "Thomas", score : 800, date : "01/12/19"},
    {name : "Noam", score : 600, date : "07/12/19"}
];

var a,b;
highscore.sort(function(a,b){
    return b.score-a.score;
});

var newPlayer = [];
var namePlayer = "" ;

var lastObjectScore = highscore[highscore.length-1] ;
console.log(lastObjectScore);

function compareScore(){
    if(lastObjectScore.score<updateScore)
    {
        namePlayer = prompt("You win !  \n Enter your name : ");
        newPlayer = {name: namePlayer, score: updateScore , date : theDate};
        console.log(newPlayer);    
        highscore.push(newPlayer);
        highscore.sort(function(a,b){return b.score-a.score;});
        highscore.pop();
        console.log(highscore);
        localStorage.setItem('highscore', JSON.stringify(highscore));
        afficheTheScore();
      }
    
      else{
        alert("You loose :( You d'ont have enough point to be one of the best");

      }}
    
      localStorage.setItem('highscore', JSON.stringify(highscore));
      var divHighScore = document.getElementById("thesc");
      var highscore = [];

      var highscorejson = localStorage.getItem("highscore");
      localStorage.setItem('highscore', JSON.stringify(highscore));
      if(highscorejson != null){
        highscore = JSON.parse(highscorejson); 
        afficheTheScore();
      }
      
      function afficheTheScore(){
        var toappend = "";
        highscore.forEach(function(name){
          toappend += `<div>${name.name} - score : ${name.score} - date: ${name.date}</div>`;
        });
        divHighScore.innerHTML = toappend;
      }
      

///////////////////////////////////////////////////////////////////////////////////////////////////


function start () {
    btn_start.disabled = true ;
    t = setInterval (startChrono,1000);
    clickMe.addEventListener("mouseover", vitesDiv);
    background.addEventListener("click", lessPoint);
    clickMe.addEventListener ("click", newScore);
    document.getElementById ("clikme").className = "rotating";   
};

function startChrono () {
    sec--;
    timer.innerHTML = sec + " s"
    if (sec ==0){
        sec = 0;
        gameOver();
    }
};

function vitesDiv () {
    setTimeout(randMove, m);
};

function newScore (e){
    e.stopPropagation();
    updateScore += 10 * lvl;
    score.innerHTML = updateScore - missclick;

    if(updateScore){
        pointfornxt --;
        pointnxt.innerHTML = pointfornxt;
    };

    if(pointfornxt == 0) {
        pointfornxt = 10;
        m -= 50;
        lvl +=1;
        level.innerHTML = lvl;
        sec +=10;
        timer.innerHTML = sec + " s";
        rotating.style.animationDuration = (rotatClick -= 0.25 + "s");
    };
    if (lvl == 6) {
        compareScore();
        resetGame();
        
    }
};

function randMove() {
    clickMe.style.top = Math.floor(Math.random() * 400) + "px";
    clickMe.style.left = Math.floor(Math.random() * 900) + "px";
};

function lessPoint() {
    missclick +=1 * lvl ;
    miss.innerHTML = missclick;
    score.innerHTML = updateScore - missclick;
};


function gameOver () {
    alert("You loose :( \n Total Score :"+updateScore);
    compareScore();
    resetThegame();
  }
  
function resetGame () {
updateScore == 0 ;
score.innerText == 0;
pointfornxt == 10 ;
pointnxt.innerText == 10;
lvl==1;
level.innerText = 1;
missclick = 0 ;
miss.innerText = 0 ;
sec == 60 ;
timer.innerText = sec;
}