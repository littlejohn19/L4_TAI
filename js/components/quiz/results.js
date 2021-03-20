const results = document.querySelector('.results');
const pointsElem = document.querySelector('.score');
const userScorePoint = document.querySelector('.userScorePoint');
const userScorePercent = document.querySelector('.userScorePercent');
const avgScorePoint = document.querySelector('.avgScorePoint');
const avgScorePercent = document.querySelector('.avgScorePercent');
const restart = document.querySelector('.restart');

function saveAndShowResults() {
    list.style.display = 'none';
    results.style.display = 'block';

    const lastGamesCounter = localStorage.getItem(countOfGamesLSKey);
    const gamesCounter = lastGamesCounter != null ? parseInt(lastGamesCounter) + 1: 1;
    localStorage.setItem(countOfGamesLSKey, String(gamesCounter));

    const lastAvg = localStorage.getItem(quizAverageLSKey);
    const avg = lastAvg != null ? (parseFloat(lastAvg) + points) / 2 : points;
    localStorage.setItem(quizAverageLSKey, String(avg));

    showPoints();
}

function showPoints() {
    const maxPoints = preQuestions.length;
    const placesAfterPoint = 2;

    userScorePoint.innerHTML = points;
    userScorePercent.innerHTML = String(points * 100 / maxPoints);

    const avgScores = localStorage.getItem(quizAverageLSKey);
    avgScorePoint.innerHTML = String(parseFloat(avgScores).toFixed(placesAfterPoint));
    avgScorePercent.innerHTML = String((parseFloat(avgScores) * 100 / maxPoints).toFixed(placesAfterPoint));
}

function restartQuiz() {
    index = points = 0;
    const userScorePoint = document.querySelector('.score');
    steps.innerHTML = '';
    createSteps();
    list.style.display = 'block';
    results.style.display = 'none';
    userScorePoint.innerHTML = points;
    setQuestion();
    activateAnswers();
}
