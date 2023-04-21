const questions = [
    {
        question: "Which is a javascript framework?",
        answers: [
            { text: "Vue", correct: true },
            { text: "Laravel", correct: false },
            { text: "Spring", correct: false },
            { text: "none", correct: false },
        ]
    },
    {
        question: "Which is a front-end language?",
        answers: [
            { text: "Python", correct: false },
            { text: "Php", correct: false },
            { text: "Golang", correct: false },
            { text: "Javascript", correct: true },
        ]
    },
    {
        question: "Which is a back-end framework?",
        answers: [
            { text: "Vue.js", correct: false },
            { text: "Node.js", correct: true },
            { text: "React.js", correct: false },
            { text: "Three.js", correct: false },
        ]
    },
    {
        question: "Which variable cannot be changed later?",
        answers: [
            { text: "Let", correct: false },
            { text: "Var", correct: false },
            { text: "Const", correct: true },
            { text: "none", correct: false },
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
};

function showQuestion() {
    // Reset
    resetState();

    // Question
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    //Answers
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
};

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

function selectAnswer(e) {
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";

    if (iscorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "flex";
};

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again!";
    nextButton.style.display = "flex";
};

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
};

nextButton.addEventListener('click', function () {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});
startQuiz();