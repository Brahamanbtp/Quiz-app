// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Define quiz questions
    let questions = [
        {
            prompt: `Inside which HTML element do we put the JavaScript?`,
            options: ["<javascript>", "<js>", "<script>", "<scripting>"],
            answer: "<script>",
        },
        {
            prompt: `How do you call a function named myFunction?`,
            options: [
                "call myFunction()",
                "myFunction()",
                "call function myFunction",
                "Call.myFunction",
            ],
            answer: "myFunction()",
        },
        {
            prompt: `How does a for loop start?`,
            options: [
                "for (i = 0; i <= 5; i++)",
                "for (i = 0; i <= 5)",
                "for i = 1 to 5",
                "for (i <= 5; i++)",
            ],
            answer: "for (i = 0; i <= 5; i++)",
        },
        {
            prompt: `In JavaScript, which of the following is a logical operator?`,
            options: ["|", "&&", "%", "/"],
            answer: "&&",
        },
        {
            prompt: `A named element in a JavaScript program that is used to store and retrieve data is a _____.`,
            options: ["method", "assignment operator", "variable", "string"],
            answer: "variable",
        },
    ];

    // DOM Elements
    let questionsEl = document.querySelector("#questions");
    let timerEl = document.querySelector("#timer");
    let choicesEl = document.querySelector("#options");
    let submitBtn = document.querySelector("#submit-score");
    let startBtn = document.querySelector("#start");
    let nameEl = document.querySelector("#name");
    let feedbackEl = document.querySelector("#feedback");

    // Quiz's initial state
    let currentQuestionIndex = 0;
    let time = questions.length * 15;
    let timerId;

    // Start quiz and hide frontpage
    function quizStart() {
        timerId = setInterval(clockTick, 1000);
        timerEl.textContent = time;
        let landingScreenEl = document.getElementById("start-screen");
        landingScreenEl.classList.add("hide");
        questionsEl.classList.remove("hide");
        getQuestion();
    }

    // Loop through array of questions and answers and create list with buttons
    function getQuestion() {
        let currentQuestion = questions[currentQuestionIndex];
        let promptEl = document.getElementById("question-words");
        promptEl.textContent = currentQuestion.prompt;
        choicesEl.innerHTML = "";
        currentQuestion.options.forEach((choice, i) => {
            let choiceBtn = document.createElement("button");
            choiceBtn.setAttribute("value", choice);
            choiceBtn.textContent = i + 1 + ". " + choice;
            choiceBtn.addEventListener("click", questionClick);
            choicesEl.appendChild(choiceBtn);
        });
    }

    // Check for right answers and deduct time for wrong answer, go to next question
    function questionClick() {
        let selectedAnswer = this.value;
        let correctAnswer = questions[currentQuestionIndex].answer;
        if (selectedAnswer === correctAnswer) {
            feedbackEl.textContent = "Correct!";
            feedbackEl.style.color = "green";
        } else {
            feedbackEl.textContent = `Wrong! The correct answer was ${correctAnswer}.`;
            feedbackEl.style.color = "red";
            time -= 10;
            if (time < 0) {
                time = 0;
            }
            timerEl.textContent = time;
        }
        feedbackEl.classList.remove("hide");
        currentQuestionIndex++;
        setTimeout(() => {
            feedbackEl.classList.add("hide");
            if (currentQuestionIndex === questions.length) {
                quizEnd();
            } else {
                getQuestion();
            }
        }, 2000);
    }

    // End quiz by hiding questions, stop timer and show final score
    function quizEnd() {
        clearInterval(timerId);
        let endScreenEl = document.getElementById("quiz-end");
        endScreenEl.classList.remove("hide");
        let finalScoreEl = document.getElementById("score-final");
        finalScoreEl.textContent = time;
        questionsEl.classList.add("hide");
    }

    // End quiz if timer reaches 0
    function clockTick() {
        time--;
        timerEl.textContent = time;
        if (time <= 0) {
            quizEnd();
        }
    }

    // Save score in local storage along with users' name
    function saveHighscore() {
        let name = nameEl.value.trim();
        if (name !== "") {
            let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
            let newScore = {
                score: time,
                name: name,
            };
            highscores.push(newScore);
            window.localStorage.setItem("highscores", JSON.stringify(highscores));
            alert("Your Score has been Submitted");
        }
    }

    // Save users' score after pressing enter
    function checkForEnter(event) {
        if (event.key === "Enter") {
            saveHighscore();
            alert("Your Score has been Submitted");
        }
    }

    // Event listeners
    startBtn.addEventListener("click", quizStart);
    nameEl.addEventListener("keyup", checkForEnter);
    submitBtn.addEventListener("click", saveHighscore);
});
