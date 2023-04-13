// Renders highscores in highscore page
renderHighscores();
function renderHighscores () {
    var highScoresList = JSON.parse(localStorage.getItem("highScoresList"));
    if (highScoresList !== null) {
        for (var i = 0; i < highScoresList.length; i++) {
            var li = document.createElement("li");
            li.textContent = i+1 + ". " + highScoresList[i].name + " - " + highScoresList[i].score;
            scoreList.appendChild(li);
        }
    }
}