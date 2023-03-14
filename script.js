class Direction {
    Names;

    constructor() {
        this.Names = { None: 'none', Up: '↑', Down: '↓', Left: '←', Right: '→' };
    }
}

class Position {
    X;
    Y;

    constructor() {
        this.X = 0;
        this.Y = 0;
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

const power = 300;
const maxPos = 3;

let direction = new Direction();

let position = new Position();

let clickButton = document.getElementById("clickButton");
let scoreText = document.getElementById("score");
let knockedScoreText = document.getElementById("knockedScore");
let bestScoreText = document.getElementById("bestScore");

function ChangeDirection(){
    let dirName;

    while (true) {
        let dir = getRandomIntInclusive(0, 1) * 2 - 1;

        if (getRandomIntInclusive(0, 1) === 0) {
            if (Math.abs(position.X + dir) === maxPos) {
                continue;
            }
            position.X += dir;
            if (dir > 0)
                dirName = direction.Names.Right;
            else
                dirName = direction.Names.Left;

            break;
        } else {
            if (Math.abs(position.Y + dir) === maxPos) {
                continue;
            }
            position.Y += dir;
            if (dir < 0)
                dirName = direction.Names.Up;
            else
                dirName = direction.Names.Down;

            break;
        }
    }

    clickButton.textContent = dirName;
}

function MoveToPosition(){
    clickButton.style.marginLeft = power * position.X + "px";
    clickButton.style.marginTop = power * position.Y + "px";
}

function NextButtonStage() {
    MoveToPosition();
    ChangeDirection();

    // clickButton.setAttribute("disabled","");
    // clickButton.setAttribute("Navigation","None");
    // not work

    console.log(position);
}

function Expectation() {
    if (currentSpeedLayer !== speedLayers - 1){
        currentSpeedLayer++;

        return;
    }

    if (score > bestScore){
        bestScore = score;

        bestScoreText.textContent = bestScore;

        localStorage.setItem('bestScore', bestScore);
    }

    score = 0;

    currentSpeedLayer = 0;

    scoreText.textContent = score.toString();

    NextButtonStage();
}

function KnockedScoreHide() {
    knockedScoreText.textContent = '';

    window.clearTimeout(knockedTimerId);
}

function StartExpectationTimer() {
    timerId = window.setInterval(Expectation, expectationTime / speedLayers);
}

let score = 0;
let bestScore = 0;
let reward = 300;

if (localStorage.getItem('bestScore') != null){
    bestScore = localStorage.getItem('bestScore');

    bestScoreText.textContent = bestScore;
}

let speedLayers = 3;
let currentSpeedLayer = 0;
let expectationTime = 800;
let timerId;
StartExpectationTimer();

let knockedScoreTime = 250;
let knockedTimerId;

ChangeDirection();

function clickButton_Click() {
    window.clearTimeout(timerId);

    NextButtonStage();

    let currentReward = reward / (currentSpeedLayer + 1);
    score += currentReward;

    window.clearTimeout(knockedTimerId); // danger or safe!?

    knockedScoreText.textContent = '+' + currentReward.toString()/* + `; ${currentSpeedLayer}`*/;
    knockedTimerId = window.setInterval(KnockedScoreHide, knockedScoreTime)

    currentSpeedLayer = 0;

    scoreText.textContent = score.toString();

    StartExpectationTimer();
}