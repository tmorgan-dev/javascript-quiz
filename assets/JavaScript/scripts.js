//Array containing questions, answers and correct answer
var questionArray = [
    {
        question: "Where is the ideal location to link a scripts.js file in your index.html?",
        answerOptions: ["In the meta data", "Below the Footer", "It does not matter", "In the header"],
        answer: "Below the Footer",
    },
    {
        question: "What is the correct case style to use when declaring a variable in JavaScript?",
        answerOptions: ["Snake Case", "Kebab Case", "Pascal Case", "Camel Case"],
        answer: "Camel Case",
    },
    {
        question: "To run a function on a declared variable, enter the variable name...",
        answerOptions: ["In parentheses", "In the curly brackets", "In the square brackets", "In quotations"],
        answer: "In parentheses",
    },
    {
        question: "JavaScript can be used to edit the content of...",
        answerOptions: ["The HTML", "The CSS", "Both", "Neither"],
        answer: "Both",
    },
]

var choiceList = ["#button1", "#button2", "#button3", "#button4"]
var currentIndex = 0
var secondsLeft = 180;

var initialsEl = document.querySelector("#input")
var scoreForm = document.querySelector("#scoreform")
var scores = document.querySelector(".scores")
var scoreList = document.querySelector(".scorelist")
var endScreen = document.querySelector(".endscreen")
var timeEl = document.querySelector("#countdown")
var finalScore = document.querySelector("#finalscore")
var timer = document.querySelector(".timer")

var questionText = document.querySelector('#question')
var result = document.querySelector("#result")


var startButton = document.querySelector("#start")
var scoresButton = document.querySelector('#highscores')
var answerContainer = document.querySelector('.answercontainer')


//function to create the landing page which starts the quiz
function init() {
    questionText.textContent = "Welcome to the JavaScript Quiz! Click Start to begin the quiz. You will have three minutes to answer four questions. Incorrect answers will deduct five seconds from you score. Log your initials and high score at the end!"
    scores.style.display = 'none'
    scoreList.style.display = 'none'
    endScreen.style.display = 'none'
    answerContainer.style.display = 'none'
    scoresButton.style.display = 'none'
}
init()

startButton.addEventListener("click", displayQuestion)
startButton.addEventListener("click", startTimer)

//function for the timer
function startTimer() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            endGame()
        }

    }, 1000);
}

//Function to cycle through the questions and answers
function displayQuestion() {
    startButton.style.display = 'none'
    answerContainer.style.display = 'flex'
    questionText.textContent = questionArray[currentIndex].question
    var answerChoices = questionArray[currentIndex].answerOptions

    for (var i = 0; i < answerChoices.length; i++) {
        var buttons = document.querySelectorAll(choiceList[i])
        for (var j = 0; j < buttons.length; j++) {
            buttons[j].textContent = answerChoices[i]
        }
    }
}

//Event listener for the user's answer
answerContainer.addEventListener("click", function (event) {
    var userAnswer = event.target;
    if (userAnswer.matches("button")) {
        checkAnswer(userAnswer.textContent)
    }
})

//Function to check if answer if correct or incorrect and call another question or end game
function checkAnswer(userAnswer) {
    var correctAnswer = questionArray[currentIndex].answer
    if (userAnswer === correctAnswer) {
        result.textContent = "Correct!"
    }
    else {
        result.textContent = "Incorrect."
        secondsLeft -= 5
    }
    currentIndex++

    if (questionArray.length > currentIndex) {
        displayQuestion()
    }
    else {
        endGame()        
    }
}

//function that ends the quiz
function endGame() {
    timer.textContent = ""
    finalScore.textContent = secondsLeft
    questionText.textContent = ""
    result.textContent = ""
    answerContainer.style.display = 'none'
    endScreen.style.display = 'flex'
}

//function that allows user to save their score
function saveScore() {
    var initials = initialsEl.value.trim()
    var highScore = JSON.parse(localStorage.getItem("highScore")) || []
    var newScore = {
        initials: initials,
        score: finalScore.textContent,
    }
    highScore.push(newScore)
    localStorage.setItem("highScore", JSON.stringify(highScore))
}

//Function to display high scores
function renderScores() {
    var savedScores = JSON.parse(localStorage.getItem("highScore")) || []
    for (var i = 0; i < savedScores.length; i++) {
        var li = document.createElement("li")
        li.textContent = `${savedScores[i].initials} - ${savedScores[i].score}`
        scoreList.appendChild(li)
    }
    scores.style.display = 'flex'
    scoreList.style.display = 'flex'
}

//Event listeners for starting the game, displaying the scores and rendering the scores
scoreForm.addEventListener("submit", function () {
    saveScore()
    initialsEl.value = ""
})

scoresButton.addEventListener("click", renderScores())