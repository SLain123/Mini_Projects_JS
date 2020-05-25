const mainTable = document.querySelector('.main-table'),
    timerText = document.querySelector('.timer'),
    resultGame= document.querySelector('.result-game'),
    resetBtn = document.querySelector('.reset-btn'),
    level = document.querySelector('.level'),
    bonusText = document.querySelector('.bonus'),
    recordText = document.querySelector('.record'),
    funishNumText = document.querySelector('.finish-num');

let row = 5,
    column = 5,
    rightNumForClick = 1,
    firstLaunch = true,
    finishGame = false,
    bonus = 0,
    record = 0;

start();

resetBtn.addEventListener('click', returnAfterResult);

// Main func which start ALL ========================================

function start() {
    arrRandome = genRandomeArr(row * column);
    createTab(row, column, arrRandome);
    displayRowColumn();
    displayLevel();
}

// Display row and column in header ==================================

function displayRowColumn() {
    funishNumText.innerHTML = row * column;
}

// CREATE table func =================================================

function createTab(row, column, arr) {
    let iter = 0;
    for(let i = 0; i < row; i++) {
        let tr = document.createElement('tr');

        for(let j = 0; j < column; j++) {
            let td = document.createElement('td');

            td.style.cssText = 'border: black 1px solid; width: 50px; height: 50px; font-size: 20px; text-align: center;';
            td.innerHTML = arr[iter];
            td.addEventListener('click', clickOnNum);
            
            iter++;
        
            tr.append(td);
        }
        mainTable.append(tr);
    }
}

// generate array with RANDOME NUMBERS =================================

function genRandomeArr(count) {
    let arr = [];

    for(let iter = 1; iter <= count; iter++) {
        arr.push(iter);
    }
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    return arr;
}

// EVENT CLICK on number ==================================================

function clickOnNum() {
    if(this.innerHTML == rightNumForClick) {
        getRed(this);
        finishGame =  checkRedDate();
    }
    if(firstLaunch == true) {
        startTimer();
        firstLaunch = false;
    }
    if(finishGame == true && timerText.innerHTML > 0) {
        winGame();
    }
}

// Do table date RED BACKGROUND

function getRed(elem) {
    elem.style.background = 'red';
    rightNumForClick++;
}

// Check all table date IF ALL RED=========================================

function checkRedDate() {
    let check = true,
        dates = document.querySelectorAll('.main-table td'); 

    for(let i = 0; i < dates.length; i++) {
        if(dates[i].style.background != 'red') {
            check = false;
        }
    }
    return check;
}

// Timer ===================================================================

function startTimer() {
    let timer = setInterval(() => {
        timerText.innerHTML = Number(timerText.innerHTML) - 1;

        if(timerText.innerHTML > 10) {
            timerText.style.color = "green";
        }
        else timerText.style.color = "red";

        if(timerText.innerHTML == 0 && finishGame == false) {
            clearInterval(timer);
            loseGame();
        }
        else if(timerText.innerHTML == 0) {
            clearInterval(timer);
            timerText.style.color = "green";
        }
    }, 1000);
}

// If game LOSE ============================================================

function loseGame() {
    resultGame.style.color = 'red';
    resultGame.innerHTML = "You are lose!";
    stopAll();

    resetBtn.removeAttribute('disabled', '');
    level.innerHTML = 0;
    bonusText.innerHTML = 0;
    record = 0;
    bonus = 0;

    timerText.innerHTML = 60;

    row = 5;
    column = 5;
}

// If game WIN=============================================================

function winGame() {
    row++;
    column++;
    countBonus();
    countRecord();

    resultGame.style.color = 'green';
    resultGame.innerHTML = `Congratulation! You are WIN!!! Ready to next level...`;
    timerText.innerHTML = 1;
    stopAll();

    let startAfterSec = setTimeout(returnAfterResult, 2500);
}

// STOP ALL \\ GAME END====================================================

function stopAll() {
    let dates = document.querySelectorAll('.main-table td'); 

    for(let i = 0; i < dates.length; i++) {
        dates[i].removeEventListener('click', clickOnNum);
    }
}

// Return various to start ================================================

function returnAfterResult() {
    dateForDelete = mainTable.children;

    for(let i = dateForDelete.length - 1; i >= 0; i--) {
        dateForDelete[i].remove();
    }

    resultGame.innerHTML = '';
    timerText.innerHTML = 60 + bonus;
    rightNumForClick = 1,
    firstLaunch = true,
    finishGame = false;

    resetBtn.setAttribute('disabled', '');

    start();
}

// Display current LEVEL ======================================================

function displayLevel() {
    level.innerHTML = Number(level.innerHTML) + 1;
}

// Count TIME-BONUS and RECORD ===========================================================

function countBonus() {
    bonus = Math.floor(Number(timerText.innerHTML));
    bonusText.innerHTML = bonus;

    if(bonus > 1) {
        bonusText.style.color = 'green';
    }
    else bonusText.style.color = 'red';
}

function countRecord() {
    record++;
    recordText.innerHTML = record;
}