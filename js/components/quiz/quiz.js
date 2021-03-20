const list = document.querySelector('.list');
const question = document.querySelector('.question');
const answers = document.querySelectorAll('.list-group-item');
const currentQuestion = document.querySelector('.currentQuestion');
const progressBar = document.querySelector('.progress-bar');
const progressBarTime = document.querySelector('.progress-bar-time');
const steps = document.querySelector('.steps');

fetch(questionsEndpoint)
    .then(resp => resp.json())
    .then(resp => {
        preQuestions = resp;
        startQuiz();
    });

function startQuiz() {
    countOfQuestions = preQuestions.length;
    countOfAllAnswers = answers.length;
    createSteps();
    addEventListeners();
    setQuestion();
    activateAnswers();
}

function createSteps() {
    preQuestions.forEach((question) => {
        const stepWrapper = document.createElement('div');
        stepWrapper.classList.add('step-wrapper');

        const step = document.createElement('div');
        step.classList.add('step');
        step.classList.add('empty-step');
        stepWrapper.appendChild(step);

        steps.appendChild(stepWrapper);
    });
}

function addEventListeners() {
    answers.forEach((answer) => {
        answer.addEventListener('click', doAction);
    })

    restart.addEventListener('click', (event) => {
        event.preventDefault();
        restartQuiz();
    });
}

function nextQuestion() {
    index++;
    if (index >= preQuestions.length) {
        saveAndShowResults();
    } else {
        setQuestion();
        activateAnswers();
    }
}

function doAction(event) {
    stopTime();
    disableAnswers();

    const target = event.target;
    if (target.innerHTML === preQuestions[index].correct_answer) {
        points++;
        pointsElem.innerText = points;
        markCorrect(event.target);
    } else {
        markInCorrect(event.target);
        setTimeout(() => {
            markValid(target.parentNode, preQuestions[index].correct_answer);
        }, second / 2);
    }

    setTimeout(() => {
        nextQuestion();
    }, second * 2.5);
}

function markValid(answersList, correctAnswer) {
    const currentAnswers = answersList.children;
    for (let i = 0; i < countOfAllAnswers; i++) {
        if (currentAnswers[i].innerHTML === correctAnswer) {
            currentAnswers[i].classList.add(correctAnswerClass);
        }
    }
}

function setQuestion() {
    clearClasses();
    stopTime();
    setTime(timePerQuestion);
    setProgressBarColor(progressBarChillColor);
    setCurrentStep();
    countTime();
    setAnswers();
}

function stopTime() {
    if (countTimer) {
        clearInterval(countTimer);
    }
}

function countTime() {
    countTimer = setInterval(() => {
        time--;
        if (time < 0) {
            clearInterval(countTimer);
            setStepColor('bg-warning');
            nextQuestion();
        } else {
            if (time === timeDanger) {
                setProgressBarColor(progressBarDangerColor);
            } else if (time === timeWarning) {
                setProgressBarColor(progressBarWarningColor);
            }
            setTime(time);
        }
    }, second);
}

function setAnswers() {
    const currentQuestionData = preQuestions[index];
    const countOfCurrentAnswers = currentQuestionData.answers.length;

    question.innerHTML = currentQuestionData.question;

    for (let i = 0; i < countOfAllAnswers; i++) {
        answers[i].innerHTML = currentQuestionData.answers[i];
        answers[i].style.display = i < countOfCurrentAnswers ? 'block' : 'none';
    }

    currentQuestion.innerHTML = `${index + 1} / ${countOfQuestions}`;
}

function setCurrentStep() {
    setStepColor('bg-secondary', true);
}

function setStepColor(className, isFirst) {
    const currentStepWrapper = steps.children[index];
    const currentStep = currentStepWrapper.querySelector('.step');

    if (!!isFirst && isFirst) {
        currentStep.classList.remove('empty-step');
    }

    currentStep.classList.add(className);
}

function setProgressBarColor(color) {
    progressBar.style.backgroundColor = color;
}

function setTime(currentTime) {
    time = currentTime;
    progressBar.style.width = (time * 10) + '%';
    progressBarTime.innerHTML = time + 's';
}

function markCorrect(elem) {
    elem.classList.add(correctAnswerClass);
    setStepColor('bg-success');
}

function markInCorrect(elem) {
    elem.classList.add(incorrectAnswerClass);
    setStepColor('bg-danger');
}

function disableAnswers() {
    answers.forEach((answer) => {
        answer.removeEventListener('click', doAction);
    });
}

function clearClasses() {
    answers.forEach((answer) => {
       answer.classList.remove(incorrectAnswerClass);
       answer.classList.remove(correctAnswerClass);
    });
}

function activateAnswers() {
    answers.forEach((answer) => {
        answer.addEventListener('click', doAction);
    });
}
