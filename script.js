const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("right-answers");

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

startButton.addEventListener("click", startGame);

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

// game Start Function

function startGame() {
    score = 0;
    scoreElement.innerText = score;

    startButton.classList.add("hide");
    nextButton.classList.add("hide");

    shuffledQuestions = questions.sort(() => Math.random() - 0.5);

    currentQuestionIndex = 0;

    questionContainer.classList.remove("hide");

    setNextQuestion();
}

// move to next question

function setNextQuestion() {
    resetState();

    if (currentQuestionIndex >= shuffledQuestions.length) {
        endQuiz();
        return;
    }

    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// show Questions

function showQuestion(question) {
    questionElement.innerText = question.question;

    question.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerText = answer.text;

        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });
}

function resetState() {

    clearStatusClass(document.body);

    nextButton.classList.add("hide");

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {

    const selectedButton = e.target;

    const correct = selectedButton.dataset.correct === "true";

    if (correct) {
        score++;
        scoreElement.innerText = score;
    }

    setStatusClass(document.body, correct);

    Array.from(answerButtons.children).forEach(button => {

        setStatusClass(button, button.dataset.correct === "true");

        button.disabled = true;
    });

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart Quiz";
        startButton.classList.remove("hide");
    }
}

function endQuiz() {

    questionElement.innerHTML =
        ` Quiz Finished!<br><br>Your Score: ${score} / ${questions.length}`;

    answerButtons.innerHTML = "";

    nextButton.classList.add("hide");

    startButton.innerText = "Play Again";
    startButton.classList.remove("hide");
}

function setStatusClass(element, correct) {

    clearStatusClass(element);

    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {

    element.classList.remove("correct");
    element.classList.remove("wrong");
}

const questions = [

{
question:"Which language is used for web page structure?",
answers:[
{text:"HTML",correct:true},
{text:"CSS",correct:false},
{text:"Python",correct:false},
{text:"Java",correct:false}
]
},

{
question:"Which language styles a webpage?",
answers:[
{text:"HTML",correct:false},
{text:"CSS",correct:true},
{text:"React",correct:false},
{text:"Node",correct:false}
]
},

{
question:"Which is a JavaScript Framework?",
answers:[
{text:"React",correct:true},
{text:"Laravel",correct:false},
{text:"Django",correct:false},
{text:"Spring",correct:false}
]
},

{
question:"Which company developed Java?",
answers:[
{text:"Microsoft",correct:false},
{text:"Sun Microsystems",correct:true},
{text:"Google",correct:false},
{text:"Apple",correct:false}
]
},

{
question:"Which symbol is used for comments in JavaScript?",
answers:[
{text:"//",correct:true},
{text:"<!-- -->",correct:false},
{text:"#",correct:false},
{text:"**",correct:false}
]
},

{
question:"Which HTML tag inserts an image?",
answers:[
{text:"<img>",correct:true},
{text:"<image>",correct:false},
{text:"<pic>",correct:false},
{text:"<src>",correct:false}
]
},

{
question:"CSS stands for?",
answers:[
{text:"Cascading Style Sheets",correct:true},
{text:"Creative Style Sheet",correct:false},
{text:"Computer Style System",correct:false},
{text:"Color Sheet Style",correct:false}
]
},

{
question:"JavaScript file extension?",
answers:[
{text:".js",correct:true},
{text:".java",correct:false},
{text:".html",correct:false},
{text:".css",correct:false}
]
},

{
question:"Which keyword declares a constant?",
answers:[
{text:"let",correct:false},
{text:"var",correct:false},
{text:"const",correct:true},
{text:"static",correct:false}
]
},

{
question:"Which method prints in console?",
answers:[
{text:"console.print()",correct:false},
{text:"print()",correct:false},
{text:"console.log()",correct:true},
{text:"echo()",correct:false}
]
}

];