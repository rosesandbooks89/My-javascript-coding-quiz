//variables
var timer = document.getElementById("timer");
var introCard = document.getElementById("intro");
var startButton = document.getElementById("start");
var lastButtons = document.getElementById("lastButtons");
// var card = document.getElementById("card");
var question = document.getElementById("question");
var buttonOne = document.getElementById("buttonOne");
var buttonTwo = document.getElementById("buttonTwo");
var buttonThree = document.getElementById("buttonThree");
var buttonFour = document.getElementById("buttonFour");

var endScreen = document.getElementById("final-card");
var submitButton = document.getElementById("submit");
var score = document.getElementById("final-score");

// var highScores = document.getElementById("highScores");
var backButton = document.getElementById("back");
var clearButton = document.getElementById("clear");

var wrongMessage = document.getElementById("wrong");
var correctMessage = document.getElementById("correct");

//////////////////////////////////////////////////////////////

var initialsInput = document.getElementById("initials");
var quizCard = document.getElementById("card");

var viewScores = document.getElementById("view-highscores");
var highscoreCard = document.getElementById("highscores");

var userList = document.querySelector("#user-list");

//timer var
const startTime = 100;
var timeLeft = startTime;
var i = 0;
var finalScore = 0;
var lastCard = false;
var time;

// questions and options
var arrayQuestion = [
  "What is the basic markup langauge?",
  "I need to make a button. What is the correct HTML syntax?",
  "Which of these is a Javascript library?",
  "How do I make an entire background blue?",
];
var arrayOptionOne = ["Javascript", "<btn></btn>", "MySQL", "color:blue"];
var arrayOptionTwo = [
  "CSS",
  "<button = button></button?",
  "Node",
  "background-color:blue",
];
var arrayOptionThree = [
  "C++",
  "<button></button>",
  "jQuery",
  "background-color = blue",
];
var arrayOptionFour = [
  "HTML",
  "<btn = button></btn>",
  "Python",
  "color = blue,",
];
// correct answers
var arrayAnswers = [
  "HTML",
  "<button></button>",
  "jQuery",
  "background-color:blue",
];
var userAnswer = "";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// sets inital time on timer on start screen
timer.textContent = "Time: " + timeLeft;

//timer start
function startTimer() {
  var timerInterval = setInterval(function () {
    timeLeft--;
    timer.textContent = "Time: " + timeLeft;

    if (timeLeft <= 0 || lastCard == true) {
      clearInterval(timerInterval);
      quizOver();
    }
  }, 1000);
  return;
}
//hides intro card
function startClicked() {
  introCard.setAttribute("style", "display:none;");
  quizCard.removeAttribute("style");
  startTimer();
  switchQuestion(i);
}
//switch question function & display next question
function switchQuestion(cardNum) {
  if (i < arrayQuestion.length) {
    question.textContent = arrayQuestion[cardNum];
    buttonOne.textContent = arrayOptionOne[cardNum];
    buttonTwo.textContent = arrayOptionTwo[cardNum];
    buttonThree.textContent = arrayOptionThree[cardNum];
    buttonFour.textContent = arrayOptionFour[cardNum];
    i++;
  } else {
    lastCard = true;
  }
  return;
}
// when correct answer is chosen

function checkAnswer(answerNum) {
  if (userAnswer == arrayAnswers[answerNum]) {
    correctMessage.removeAttribute("style");
    var displayMessage = setTimeout(function () {
      correctMessage.setAttribute("style", "display:none;");
    }, 1000);
  } else {
    if (timeLeft > 10) {
      timeLeft -= 10;
    } else {
      timeLeft = 0;
    }
    wrongMessage.removeAttribute("style");
    var displayMessage = setTimeout(function () {
      wrongMessage.setAttribute("style", "display:none;");
    }, 1000);
  }
  return;
}

// event listener for start button
startButton.addEventListener("click", startClicked);

//question answer listenrs
buttonOne.addEventListener("click", function () {
  userAnswer = arrayOptionOne[i - 1];
  checkAnswer(i - 1);
  switchQuestion(i);
});

buttonTwo.addEventListener("click", function () {
  userAnswer = arrayOptionTwo[i - 1];
  checkAnswer(i - 1);
  switchQuestion(i);
});

buttonThree.addEventListener("click", function () {
  userAnswer = arrayOptionThree[i - 1];
  checkAnswer(i - 1);
  switchQuestion(i);
});

buttonFour.addEventListener("click", function () {
  userAnswer = arrayOptionFour[i - 1];
  checkAnswer(i - 1);
  switchQuestion(i);
});

//highscore button
submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  //userName checks to see if there is already names saved in storage
  //if none in storage then data is pulled and stored
  // use  JSON.parse to pull down stored names
  //sets name from form
  //creates userinfo that sores initals and score
  //adds user into into array
  //updates storage with username value
  // use json.strigify to store the array values
  //checks for duplicates of the li tags and will remove all li tags
  //creast li tags and assigns in storage
  var userName = JSON.parse(localStorage.getItem("user")) || [];
  var name = initialsInput.value;
  var userInfo = {
    user: name,
    score: finalScore,
  };
  userName.push(userInfo);
  localStorage.setItem("user", JSON.stringify(userName));

  while (userList.firstChild) {
    userList.firstChild.remove();
  }

  userName.forEach(function (item) {
    var tag = document.createElement("li");
    tag.innerHTML = item.user + " - " + item.score;
    userList.appendChild(tag);
  });

  highScores();
});

//view highScores
viewScores.addEventListener("click", function () {
  introCard.setAttribute("style", "display:none;");
  quizCard.setAttribute("style", "display:none;");
  endScreen.setAttribute("style", "display:none;");
  highscoreCard.removeAttribute("style");
  lastButtons.removeAttribute("style", "display:none;");

  var userName = JSON.parse(localStorage.getItem("user")) || [];
  while (userList.firstChild) {
    userList.firstChild.remove();
  }
  userName.forEach(function (item) {
    var tag = document.createElement("li");
    tag.innerHTML = item.user + " - " + item.score;
    userList.appendChild(tag);
  });
});

// screen for highScores
//screen for end of quiz to enter initials
function quizOver() {
  finalScore = timeLeft;
  quizCard.setAttribute("style", "display:none;");
  endScreen.removeAttribute("style");
  score.textContent = "Your final score is " + finalScore;
  return;
}
function highScores() {
  endScreen.setAttribute("style", "display:none;");
  highscoreCard.removeAttribute("style");
  lastButtons.removeAttribute("style", "display:none;");
}


// // back button on score board
// // working on getting it working not functional
// backButton.addEventListener("click", function(){
//     i = 0
//     timeLeft = startTime;
//     lastCard = false;
//     time.textContent = "Time: " + timeLeft;
//     highscoreCard.setAttribute("style", "display:none;");
//     introCard.removeAttribute("style");
// });

clearButton.addEventListener("click", function() {
  // Clear localStorage
  localStorage.removeItem("user");

  // Remove all li elements from userList
  while (userList.firstChild) {
    userList.firstChild.remove();
  }
});
