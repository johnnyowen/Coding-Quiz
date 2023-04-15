// Question variables
var questions = [
    {
    question : "What does HTML Stand For?",
    answerA : "Hella Tight Modern Language",
    answerB : "Hypertext Markup Language",
    answerC : "Heather and Todd and Mark and Leslie",
    answerD : "Hold The Modem Language",
    answer : "B"
    } , {
    question :"JavaScript adds _____ websites.",
    answerA : "Text",
    answerB : "Coffee",
    answerC : "Function",
    answerD : "Comments",
    answer : "C"
    } , {
    question: "In CSS, the '*' is a/an _____ selector.",
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
    answerD : "Covid-19",
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
var totalTime = 30;
var timeLeft;
var timeInterval;

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
submitButtonEl.addEventListener("click", submit);

// Records and saves previous scores
function recordScores() {
    highScoresList = JSON.parse(localStorage.getItem("highScoresList"));
    if (!highScoresList) {
        highScoresList = [];
    }
}

// starts the quiz
function startQuiz() {
    recordScores();
    firstPageEl.style.display = "none";
    questionPageEl.style.display = "flex";
    runningQuestion = 0;
    timeLeft = totalTime;
    timeLeftEl.textContent = timeLeft;
    countdown();
    renderQuestion();
}

// timer function
function countdown() {
    timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            timeLeftEl.textContent = timeLeft;
        }
        else if (timeLeft === 0) {
            scoreRender();
        }
    }
    , 1000);

}

// renders questions in empty div
function renderQuestion() {
    var q = questions[runningQuestion];
    questionEl.innerHTML = "<p>" +q.question+ "</p>"
    answerA.innerHTML = q.answerA;
    answerB.innerHTML = q.answerB;
    answerC.innerHTML = q.answerC;
    answerD.innerHTML = q.answerD;
}

// checks answer, renders next q or final page
function checkAnswer(answer) {
    if (answer == questions[runningQuestion].answer) {
        timeLeft += 5;
    } else {  
        timeLeft -= 5;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    }
    timeLeftEl.textContent = timeLeft;
    if (runningQuestion < lastQuestion && timeLeft > 0) {
        runningQuestion++;
        renderQuestion();
    } else {
        timerEl.textContent = "Game Over";
        questionPageEl.style.display = "none";
        highscorePageEl.style.display = "flex";
        scoreRender();
    }
}

// renders scores page and sets timeLeft as score
function scoreRender() {
    clearInterval(timeInterval);
    firstPageEl.style.display = "none";
    questionPageEl.style.display = "none";
    highscorePageEl.style.display = "flex";

    scoreDiv.style.display = "flex"
    scoreDiv.innerHTML = timeLeft
}

// restart button
function restart() {
    highscorePageEl.style.display = "none";
    firstPageEl.style.display = 'flex';
    timeLeftEl.textContent = '';
    timerEl.textContent = 'Time ='
    timerEl.appendChild(timeLeftEl)
}


// submit score button
function submit() {
    var submitHighscore = {
        name: input.value,
        score: timeLeft
    };
    highScoresList.push(submitHighscore);
    localStorage.setItem("highScoresList", JSON.stringify(highScoresList));
}