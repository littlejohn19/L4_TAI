const correctAnswerClass = 'correct';
const incorrectAnswerClass = 'incorrect';

const quizAverageLSKey = 'quiz-average';
const countOfGamesLSKey = 'games-counter';

const questionsEndpoint = 'https://quiztai.herokuapp.com/api/quiz';
const timePerQuestion = 10;
const second = 1000;

const progressBarChillColor = 'green';
const progressBarWarningColor = 'orange';
const progressBarDangerColor = 'pink';
const timeWarning = 6;
const timeDanger = 3;

let index = 0;
let points = 0;
let time = 0;
let countOfQuestions = null;
let countOfAllAnswers = null;
let preQuestions = null;
let countTimer = null;
