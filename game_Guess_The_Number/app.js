const inputForNumber = document.querySelector('.i-num'),
    tips = document.querySelector('.tips'),
    seeTimer = document.querySelector('.timer'),
    resetBtn = document.querySelector('.rest-btn');
    
let timeOn = false,
    randomNum = genRandomeNum();

inputForNumber.addEventListener('keyup', enter);
resetBtn.addEventListener('click', resetAll);

// Func check key Enter ==========================

function enter(event) {
    if(event.key == 'Enter') {
        start();
    }
}

// Generate random number from 1 to 100======

function genRandomeNum() {
    let result = Math.floor((Math.random() * 100) + 1);
    return result;
}

// Start game, main func that launch all funcs============

function start() {
    displayTips();

    if(timeOn == false) {
        timeOn = true;
        startTimer();
    }
}

// Display tips function =========================

 
function displayTips() {
    let userNumber = inputForNumber.value;

    if(userNumber < 1 || userNumber > 100) {
        tips.innerHTML = "This number is WRONG";
    }
    else {
        if(userNumber == randomNum) {
            tips.innerHTML = 'You are WIN!!!';
            seeTimer.innerHTML = 1;
        }
        else if(userNumber > randomNum) {
            tips.innerHTML = 'You number MORE than need >>>';
        }
        else if(userNumber < randomNum) {
            tips.innerHTML = 'You number LESS than need <<<';
        }
    }
}

// Timer function ====================================================

function startTimer() {
    let timer = setInterval(() => {
        seeTimer.innerHTML = Number(seeTimer.innerHTML) - 1;
        if(seeTimer.innerHTML == 0 && tips.innerHTML == 'You are WIN!!!' ) {
            seeTimer.innerHTML = '';
            clearInterval(timer);
            stopAll();
        }
        else if(seeTimer.innerHTML == 0) {
            clearInterval(timer);
            tips.innerHTML = 'You are LOSE!';
            stopAll();
        }
    }, 1000);
}

// Stop all func ======================================================

function stopAll() {
    inputForNumber.removeEventListener('keyup', enter);
    inputForNumber.setAttribute('disabled', '');
    resetBtn.removeAttribute('disabled', '');
}

// RESET func =======================================================

function resetAll() {
    tips.innerHTML = '';
    timeOn = false;
    seeTimer.innerHTML = 30;
    randomNum = genRandomeNum();

    inputForNumber.removeAttribute('disabled', '');
    inputForNumber.value = '';
    inputForNumber.addEventListener('keyup', enter);
}