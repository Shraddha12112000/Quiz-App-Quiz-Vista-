//1. Set and initialize variables.
var questionCount = 0;// only 10 questions 0-9
var score = 0;
var ans;
var timedOut = 0;
var rand;
var record = [];//hold all random value index number
var stats = 0;//as long as random no is not accepted status will be zero.
//status 0 means randomly generated question number is already in the record array.we should generate a new random number.
function $(id) {
    return document.getElementById(id);
}
var quiz = $("quiz");
var quizSet = $("quizSet");
var resultBox = $("resultBox");
var question = $("question");
var option1 = $("option1");
var option2 = $("option2");
var option3 = $("option3");
var option4 = $("option4");
var submit = $("submit");
var progress = $("progress");
var result = $("result");
var retake = $("retake");
var btn1 = $("btn1");
var btn2 = $("btn2");
var btn3 = $("btn3");
var btn4 = $("btn4");
var tracker;
var countDown;
var secsInput = 30;
var seconds = secsInput;
var t;

//2. Load current question into the app.
function setQuestion(qCount, rand) {
    var ques = questions[rand];//ques has object.
    question.textContent = (qCount + 1) + ". " + ques.question;
    option1.textContent = ques.option1;
    option2.textContent = ques.option2;
    option3.textContent = ques.option3;
    option4.textContent = ques.option4;

}
function changeProgressBar(qCount) {
    progress.innerHTML = "Question " + (qCount + 1) + " of 10";//progress bar 
    tracker = $("no" + (qCount + 1));//particular tracker
    tracker.style.backgroundColor = "#cc7a00";
}
function defaultOptionColors() {
    //all options go back to normal color  
    btn1.style.backgroundColor = "#e6f3ff";
    btn2.style.backgroundColor = "#e6f3ff";
    btn3.style.backgroundColor = "#e6f3ff";
    btn4.style.backgroundColor = "#e6f3ff";

}
function getQuestion(qCount, rand) {
    if (qCount == 9) {//last question
        submit.innerHTML = "Submit Test";
        submit.style.backgroundColor = "#00b300";
        
    }
    if (qCount > 9) {
        return;
    }
    setQuestion(qCount, rand);
    changeProgressBar(qCount);
    defaultOptionColors();
    startTimer(seconds,"timer");
}

//setQuestion(4, 4);
//changeProgressBar(4);
//setQuestion(8, 8);
//3.Functions that we need -- Setting tracker , setting result page,calculating and display final score.
function setCorrect() {
    score++;
    tracker.style.backgroundColor = "#009900";
}
function setWrong() {
    tracker.style.backgroundColor = "#cc0000";
}
function finalScore() {
    if (score > 5) {
        result.innerHTML = "Congrats! You passed. <br/> Your score is " + score + "!";
    }
    else {
        result.innerHTML = "Sorry. You failed. <br/> Your score is " + score + "!";
    }

}
function setResultPage() {
    quizSet.style.display = "none";
    resultBox.style.display = "block";
    progress.innerHTML = "Quiz Completed";
    timer.textContent = "00:00";
    finalScore();
}
//4. Generate random numbers, unused number and set timer.
function randomGenerator() {
    while (stats === 0) {
        rand = Math.round(Math.random() * questions.length);
        if (rand !== questions.length) {
            //run through record array
            for (var j = 0; j < record.length; j++) {
                if (rand === record[j]) {
                    break;
                }
                else if (j == record.length - 1) {
                    record[questionCount] = rand;
                    stats = 1;

                }
                
            }
        }
    }
    stats = 0;
    return rand;


}
//Timer Function
function startTimer(secs, elem) {
    t = $(elem);
    t.innerHTML = "00:" + secs;
    if (secs < 0) {
        clearTimeout(countDown);
        //call the next question or set the result page
        //no option selected -- wrong
        if (btn1.style.backgroundColor !== "rgb(26, 255, 26)" && btn2.style.backgroundColor !== "rgb(26, 255, 26)" && btn3.style.backgroundColor !== "rgb(26, 255, 26)" && btn4.style.backgroundColor !== "rgb(26, 255, 26)") {
            //if we are at the last question
            if (questionCount == 9) {
                setWrong();
                setResultPage();
            }
            setWrong();
            secs = secsInput;
            getQuestion(++questionCount, randomGenerator());
        }
        else {
            //They've selected an option
            if (questionCount == 9) {
                if (ans === questions[rand].answer) {
                    setCorrect();
                }
                else {
                    setWrong();
                }
                setResultPage();
                return;
            }
            if (ans == questions[rand].answer) {
                setCorrect();
                secs = secsInput;
                getQuestion(++questionCount, randomGenerator());
            }
            else {
                setWrong();
                secs = secsInput;
                getQuestion(++questionCount, randomGenerator());
            }
        }
        return;

    }
    
    
    secs--;
    //recurring functon
    countDown = setTimeout('startTimer(' + secs + ',"' + elem + '")', 1000);

}
//5.Making the option selection work.
option1.addEventListener("click", optionSelect);
option2.addEventListener("click", optionSelect);
option3.addEventListener("click", optionSelect);
option4.addEventListener("click", optionSelect);
function optionSelect(e) {
    //get parent element and change background color
    var parentEl = e.target.parentElement;
    parentEl.style.backgroundColor = "#1aff1a";
    //switch statement - other buttons' colors go back to default
    switch (e.target.id) {
        case "option1": btn2.style.backgroundColor = "#e6f3ff";
            btn3.style.backgroundColor = "#e6f3ff";
            btn4.style.backgroundColor = "#e6f3ff";
            break;
        case "option2": btn1.style.backgroundColor = "#e6f3ff";
            btn3.style.backgroundColor = "#e6f3ff";
            btn4.style.backgroundColor = "#e6f3ff";
            break;
        case "option3": btn1.style.backgroundColor = "#e6f3ff";
            btn2.style.backgroundColor = "#e6f3ff";
            btn4.style.backgroundColor = "#e6f3ff";
            break;
        case "option4": btn1.style.backgroundColor = "#e6f3ff";
            btn2.style.backgroundColor = "#e6f3ff";
            btn3.style.backgroundColor = "#e6f3ff";
            break;
    }
    //set ans value based on option selected
    ans = parseInt(e.target.id.replace("option", ""),10);

}


//6. Loading the next question after the next question button is clicked.
submit.addEventListener("click", nextQuestion);
function nextQuestion() {
    if (btn1.style.backgroundColor !== "rgb(26, 255, 26)" && btn2.style.backgroundColor !== "rgb(26, 255, 26)" && btn3.style.backgroundColor !== "rgb(26, 255, 26)" && btn4.style.backgroundColor !== "rgb(26, 255, 26)") {
      alert("Please select an option");
        return;
    }
    else {
        clearTimeout(countDown);
        sec = secsInput;
        //if its last question - load result page
        if (questionCount == 9 && questionCount != 10) {
            if (ans == questions[rand].answer) {
                setCorrect();
            }
            else {
                setWrong();
            }
            setResultPage();
            return;
        }
        if (ans == questions[rand].answer) {
            setCorrect();
            getQuestion(++questionCount, randomGenerator());
        }
        else {
            setWrong();
            getQuestion(++questionCount, randomGenerator());
        }
        
    }

}
//7. Final parts - retake button, setting up random number for the first time, what happens when the page first loads.
//Retake button
retake.addEventListener("click", retakeTest);
function retakeTest() {
    window.location.reload();
}
rand = Math.round(Math.random() * questions.length);
while (rand == questions.length) {
    rand = Math.round(Math.random() * questions.length);
}
record[0] = rand;
//onload function
window.onload = getQuestion(questionCount, rand);


