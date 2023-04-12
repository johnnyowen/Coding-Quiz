// Question variables
var questions = [
    {
    question : "What does HTML Stand For?",
    answerA : "Hella Tight Modern Language",
    answerB : "Hypertext Markup Language",
    answerC : "Heather, Todd, Mark, Leslie",
    answerD : "Hold The Modem Language",
    answer : "B"
    } , {
    question :"JavaScript adds ______ to webpages.",
    answerA : "Style",
    answerB : "Coffee-Colored Fonts",
    answerC : "Function",
    answerD : "Comments",
    answer : "C"
    } , {
    question: "In CSS, the '*' is a/an ________ selector.",
    answerA : "ID",
    answerB : "Class",
    answerC : "Element",
    answerD : "Global/Universal",
    answer : "D"
    } , {
    question :"The first version of HTML was written in _____.",
    answerA : "1993",
    answerB : "1999",
    answerC : "Y2K",
    answerD : "During the Covid-19 pandemic",
    answer : "A"
    } , {
    question:  "The website ____Hub is used to store code repositories and host pages.",
    answerA : "Get",
    answerB : "Kit",
    answerC : "Git",
    answerD : "Bit",
    answer : "C"
    } , {
    question: "What is this '%' called in JavaScript?",
    answerA : "Percent",
    answerB : "Divided By",
    answerC : "Modulus",
    answerD : "value/value",
    answer : "C"
    }]

// Other variables
var startButtonEl = document.getElementById('start')
var timerEl = document.getElementById('timer')
var timeLeftEl = document.getElementById('timeLeft')
var timeLeft = 30;

var firstPageEl = document.getElementById('firstPage')
var questionPageEl = document.getElementById('questionPage')
var highscorePageEl = document.getElementById('highscorePage')

var questionEl = document.getElementById('question')
var answerA = document.getElementById('A')
var answerB = document.getElementById('B')
var answerC = document.getElementById('C')
var answerD = document.getElementById('D')

var restartButtonEl = document.getElementById('restart')
var submitButtonEl = document.getElementById('submitScore')
var scoreDiv = document.getElementById('score')

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var input = document.querySelector('input')
var scoreList = document.getElementById('scoreList')
var highScoresList = [];

// event listeners
startButtonEl.addEventListener("click", startQuiz);
restartButtonEl.addEventListener("click", restart);
submitButtonEl.addEventListener("click", submit)

// timer function
function countdown () {
    var timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            timeLeftEl.textContent = timeLeft;
            timeLeft--;
        }
        else if (timeLeft === 0) {
            timerEl.textContent = 'Game Over';
            clearInterval(timeInterval);
            firstPageEl.style.display = "none";
            questionPageEl.style.display = "none";
            highscorePageEl.style.display = "flex";
        }
    }
    , 1000);
}

// renders questions in empty div
function renderQuestion () {
    var q = questions[runningQuestion];
    question.innerHTML = "<p>" +q.question+ "</p>"
    answerA.innerHTML = q.answerA;
    answerB.innerHTML = q.answerB;
    answerC.innerHTML = q.answerC;
    answerD.innerHTML = q.answerD;
}

// starts the quiz
function startQuiz () {
    firstPageEl.style.display = "none";
    questionPageEl.style.display = "flex";
    countdown ();
    renderQuestion ();
}

// checks answer, renders next q or final page
function checkAnswer(answer) {
    if(answer == questions[runningQuestion].answer) {
        timeLeft += 5;
    } else {  
        timeLeft -= 5;
    }
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        timerEl.style.display = "none";
        questionPageEl.style.display = "none";
        highscorePageEl.style.display = "flex";
        clearInterval(timerEl);
        scoreRender();
    }
}

// renders scores page and sets timeLeft as score
function scoreRender () {
    scoreDiv.style.display = "flex"
    scoreDiv.innerHTML = timeLeft
}

// restart button
function restart () {
    clearInterval(timerEl);
    timerEl.style.display = "flex";
    highscorePageEl.style.display = "none";
    timeLeft = 30;
    runningQuestion = 0;
    startQuiz ();
}

// submit score button
function submit () {
    var submitHighscore = {
        name: input.value,
        score: score
    };
    highScoresList.push(submitHighscore);
    console.log(highScoresList)
    localStorage.setItem("highScoresList", JSON.stringify(highScoresList));
}

// Renders highscores in highscore page                    ***********************************************
function renderHighscores () {
    var highScoresList = JSON.parse(localStorage.getItem("highScoresList"));
    if (highScoresList !== null) {
        for (var i = 0; i < highScoresList.length; i++) {
            var li = document.createElement("li");
            li.textContent = i+1 + ". " + highScoresList[i].name + " - " + highScoresList[i].score;
            document.scoreList.appendChild(li);
        }
    }
}