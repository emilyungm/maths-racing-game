let stats;
let track;
let questionBox;
let currentPos;
let currentTile;
let racer;
let ending
let ans;
let distance;
let numQuestions;
let numCorrect;

window.onload = function() {
    stats = document.getElementById("gameStats");
    track = document.getElementById("track");
    questionBox = document.getElementById("questionBox");
    ending = document.getElementById("gameOver");
    racer = document.createElement("img");
    racer.src = "images/racer.png";

    let input = document.getElementById("answer");
    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            checkAnswer(input);
        }
    });

    let restartBtn = document.getElementById("restartBtn");
    restartBtn.addEventListener("click", function() {
        window.location.reload();
    });

    setGame();
}

function setGame() {
    stats.style.display = "none";
    track.style.display = "none";
    questionBox.style.display = "none";
    ending.style.display = "none";
    let startBtn = document.getElementById("startBtn");
    startBtn.addEventListener("click", onStart);

    currentPos = 0;
    numQuestions = 0;
    numCorrect = 0;
}

function onStart() {
    let loadInfo = document.getElementById("loadInfo");
    loadInfo.style.display = "none";
    stats.style.display = "block";  
    track.style.display = "flex";
    questionBox.style.display = "block";    

    for (let i=0; i<11; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        document.getElementById("track").appendChild(tile);
    }

    currentTile = document.getElementById("0");
    currentTile.appendChild(racer);

    generateQuestion();
}

function generateQuestion() {

    if (currentPos < 10) {
        numQuestions += 1;

        let questionText = document.getElementById("questionText");
        let num1 = Math.floor(Math.random()*12 + 1);
        let num2 = Math.floor(Math.random()*12 + 1);
        
        
        if (Math.random()<0.5) {
            questionText.innerHTML = `What is ${num1} + ${num2}?`;
            ans = num1 + num2;

        } else {
            questionText.innerHTML = `What is ${num1} x ${num2}?`;
            ans = num1 * num2;
        }
    } else {
        endGame();
    }
}

function checkAnswer(input) {
    if (input.value == ans) {
        // correct answer, move forwards
        currentPos += 1;
        currentTile.innerHTML = "";
        currentTile = document.getElementById(currentPos.toString());
        currentTile.appendChild(racer);
        numCorrect += 1;
    } else {
        // incorrect answer, move backwards
        if (currentPos > 0) {
            currentPos -= 1;
            currentTile.innerHTML = "";
            currentTile = document.getElementById(currentPos.toString());
            currentTile.appendChild(racer);
        }
    }
    distance = 1000 - currentPos * 100;
    document.getElementById("progress").innerHTML = `Progress: ${distance}m to go!`;
    input.value = "";
    generateQuestion();
}

function endGame() {
    track.style.display = "none";
    questionBox.style.display = "none";
    stats.style.display = "none";

    ending.style.display = "block";
    let accuracy = document.getElementById("accuracy");
    accuracy.innerHTML = `Your accuracy was ${Math.floor(numCorrect/numQuestions*100)}%`;
}