var questionArray = [
    {
        question: "question1", 
        answerOptions: ["Answer1", "Answer2", "Answer3", "Answer4"],
        answer: "Answer1",
    },
    {
        question: "question2", 
        answerOptions: ["Answer1", "Answer2", "Answer3", "Answer4"],
        answer: "Answer1",
    },
    {
        question: "question3", 
        answerOptions: ["Answer1", "Answer2", "Answer3", "Answer4"],
        answer: "Answer1",
    },
    {
        question: "question4", 
        answerOptions: ["Answer1", "Answer2", "Answer3", "Answer4"],
        answer: "Answer1",
    },
]
var choiceList = ["#button1", "#button2", "#button3", "#button4"]
var currentIndex = 0
var secondsLeft = 60;
var score = 0
var initialsEl = document.querySelector("#input")
var scoreForm = document.querySelector("#scoreform")
var scores = document.querySelector(".scores")
var scoreList = document.querySelector(".scorelist")

var timeEl = document.querySelector("#countdown");

var questionText = document.querySelector('#question')
var result = document.querySelector("#result")
var answerContainer = document.querySelector('.answercontainer')
var startButton = document.querySelector("#start")
var scoresButton = document.querySelector('#highscores')

var answerOne = document.querySelector("#button1");
var answerTwo = document.querySelector("#button2");
var answerThree = document.querySelector("#button3");
var answerFour = document.querySelector("#button4");
var endScreen = document.querySelector(".endscreen");

//function to create the landing page which starts the quiz
function init() {
    scoreList.style.display = 'none'
    endScreen.style.display = 'none'
    questionText.textContent = "Welcome to the JavaScript Quiz!"
    answerOne.style.display = 'none'
    answerTwo.style.display = 'none'
    answerThree.style.display = 'none'
    answerFour.style.display = 'none'


        answerOne.style.display = 'flex'
        answerTwo.style.display = 'flex'
        answerThree.style.display = 'flex'
        answerFour.style.display = 'flex'
 


        
        

}
init()
function startTimer (){
        //function for the timer
        var timerInterval = setInterval(function () {
            secondsLeft--;
            timeEl.textContent = secondsLeft
        
            if (secondsLeft === 0) {
                clearInterval(timerInterval);
                endGame()
                }
        
            }, 1000);
}
function displayQuestion(){
    startTimer()
    questionText.textContent = questionArray[currentIndex].question
    var answerChoices = questionArray[currentIndex].answerOptions
    
    for (var i = 0; i < answerChoices.length; i++) {
        var buttons = document.querySelectorAll(choiceList[i])
        for (var j = 0; j < buttons.length; j++) {
            buttons[j].textContent = answerChoices[i]
        }
    }
}


    
    
   

    answerContainer.addEventListener("click", function(event) {
        var userAnswer = event.target;
        if (userAnswer.matches("button")){
checkAnswer(userAnswer.textContent)
        }
    })

    function checkAnswer(userAnswer){

    
            var correctAnswer = questionArray[currentIndex].answer
            if (userAnswer === correctAnswer) {
                result.textContent = "Correct!"
                score++
          
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
function endGame(){
    endScreen.style.display = 'flex'
}
function saveScore(){
    var initials = initialsEl.value.trim()
    var highScore = JSON.parse(localStorage.getItem("highScore")) || []
    var newScore = {
        initials:initials,
        score:score,
    }
    highScore.push(newScore)
    localStorage.setItem("highScore", JSON.stringify(highScore))
}
function renderScores(){
    scoreList.style.display = 'flex'
    var savedScores = JSON.parse(localStorage.getItem("highScore")) || []
    for (var i = 0; i < savedScores.length; i++){
        var li = document.createElement("li")
        li.textContent = `${savedScores[i].initials} - ${savedScores[i].score}`
        scoreList.appendChild(li)
    }
}
startButton.addEventListener("click", displayQuestion)
scoreForm.addEventListener("submit", function (){
    saveScore()
    initialsEl.value = ""
})

scoresButton.addEventListener("click", renderScores())


// //function using a for loop to update for each question
// function questions() {
//     question.textContent = "Question"
//     answerOne.textContent = "Answer1"
//     answerTwo.textContent = "Answer2"
//     answerThree.textContent = "Answer3"
//     answerFour.textContent = "Answer4"
    
//     answerOne.addEventListener("click", incorrect)
//     answerTwo.addEventListener("click", incorrect)
//     answerThree.addEventListener("click", incorrect)
//     answerFour.addEventListener("click", correct)

//     function correct() {
//         result.textContent = "Correct!"
//         questionFour()
//     }

//     function incorrect() {
//         result.textContent = "Incorrect."
//         secondsLeft -= 5;
//         questionFour()
//     }
// }

// //functions for the questions
// function questions() {
//     questionOneAnswerOne.style.display = 'flex'
//     questionOneAnswerTwo.style.display = 'flex'
//     questionOneAnswerThree.style.display = 'flex'
//     questionOneAnswerFour.style.display = 'flex'

//     question.textContent = "Question 1"
//     answerOne.textContent = "Answer1"
//     answerTwo.textContent = "Answer2"
//     answerThree.textContent = "Answer3"
//     answerFour.textContent = "Answer4"



//     function correct() {
//         result.textContent = "Correct!"
//     }
//     answerOne.addEventListener("click", correct)
//     function incorrect() {
//         result.textContent = "Incorrect."
//         secondsLeft -= 5;
//     }    
//     answerTwo.addEventListener("click", incorrect)
//     answerThree.addEventListener("click", incorrect)
//     answerFour.addEventListener("click", incorrect)
// }

// function questionTwo() {
//     questionOneAnswerOne.style.display = 'none'
//     questionOneAnswerTwo.style.display = 'none'
//     questionOneAnswerThree.style.display = 'none'
//     questionOneAnswerFour.style.display = 'none'

//     questionTwoAnswerOne.style.display = 'flex'
//     questionTwoAnswerTwo.style.display = 'flex'
//     questionTwoAnswerThree.style.display = 'flex'
//     questionTwoAnswerFour.style.display = 'flex'


//     questionTwoAnswerOne.addEventListener("click", incorrect2)
//     questionTwoAnswerTwo.addEventListener("click", incorrect2)
//     questionTwoAnswerThree.addEventListener("click", correct2)
//     questionTwoAnswerFour.addEventListener("click", incorrect2)

//     function correct2() {
//         result.textContent = "Correct!"
//         questionThree()
//     }

//     function incorrect2() {
//         result.textContent = "Incorrect."
//         secondsLeft -= 5;
//         questionThree()
//     }
// }

// function questionThree() {
//     question.textContent = "Question 3"
//     answerOne.textContent = "Answer1.3"
//     answerTwo.textContent = "Answer2.3"
//     answerThree.textContent = "Answer3.3"
//     answerFour.textContent = "Answer4.3"
    
//     answerOne.addEventListener("click", incorrect3)
//     answerTwo.addEventListener("click", incorrect3)
//     answerThree.addEventListener("click", incorrect3)
//     answerFour.addEventListener("click", correct3)

//     function correct3() {
//         result.textContent = "Correct!"
//         questionFour()
//     }

//     function incorrect3() {
//         result.textContent = "Incorrect."
//         secondsLeft -= 5;
//         questionFour()
//     }
// }

// function questionFour() {
//     question.textContent = "Question 4"
//     answerOne.textContent = "Answer1.4"
//     answerTwo.textContent = "Answer2.4"
//     answerThree.textContent = "Answer3.4"
//     answerFour.textContent = "Answer4.4"
    
//     answerOne.addEventListener("click", incorrect4)
//     answerTwo.addEventListener("click", correct4)
//     answerThree.addEventListener("click", incorrect4)
//     answerFour.addEventListener("click", incorrect4)

//     function correct4() {
//         result.textContent = "Correct!"
//     }

//     function incorrect4() {
//         result.textContent = "Incorrect."
//         secondsLeft -= 5;
//     }
// }