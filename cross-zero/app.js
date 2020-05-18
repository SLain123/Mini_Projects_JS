const gameBlock = document.querySelector('.game'),
    tableMain = document.createElement('table'),
    parForUser = document.querySelector('.user'),
    parForCross = document.querySelector('.user-cross'),
    parForNull = document.querySelector('.user-null'),
    parForFish = document.querySelector('.user-fish'),
    buttonReset = document.querySelector('.reset'),

    winnerArr = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],

                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],

                [0, 4, 8],
                [2, 4, 6]
                            ];

let user = 'X',
    ifWinner = false;

// Создание таблицы и ее наполнение = добавление класса на каждую ячейку, событие клика на каждую ячейку;

function createTable() {

    for(let i = 0; i < 3; i++) {
        let tr = document.createElement('tr');

        for(let j = 0; j < 3; j++) {
            let td = document.createElement('td');

            td.style.cssText = 'width: 50px; height: 50px; border: 2px solid black; text-align: center; font-size: 24px';
            td.classList.add('cell');

// Вешает событие клика на каждую ячейку;

            td.addEventListener('click', clickOnTd);

            tr.append(td);
            }

            tableMain.append(tr);
        }
    tableMain.style.borderCollapse = 'collapse';
    gameBlock.append(tableMain);
}


// Событие клик на каждую ячейку = установка крестика и нолика в ячейку;

function clickOnTd() {
    if(user == 'X') {
        this.innerHTML = user;
        user = 'O';
        this.removeEventListener('click', clickOnTd);
    }
    else {
        this.innerHTML = user;
        user = 'X';
        this.removeEventListener('click', clickOnTd);
    }

// Запуск функций по вычислению победителя и тд;

    displayUser(user); // заполнить инфо строку с указанием чей сейчас ход;
    checkWinner(); // опеределить есть ли победитель;
}

// Функция заполнения инфо строки с информацией чей сейчас ход;

function displayUser(user) {
    parForUser.innerHTML = `Сейчас ходит: <b>${user}</b>`;
}

// Функция проверки есть ли победитель;

function checkWinner() {
    let cells = document.querySelectorAll('.cell');
    
    for(let i = 0; i < winnerArr.length; i++) {
        if( cells[winnerArr[i][0]].innerHTML == cells[winnerArr[i][1]].innerHTML &&
            cells[winnerArr[i][1]].innerHTML == cells[winnerArr[i][2]].innerHTML &&
            cells[winnerArr[i][0]].innerHTML != '') {
                parForUser.innerHTML = `Выиграл: <b>${cells[winnerArr[i][0]].innerHTML}</b>`;
                prepareFunc(cells);
                ifWinner = true;
                return plusForUser(cells[winnerArr[i][0]].innerHTML);
            }
        else if(ifWinner == false){
            checkFish(cells); // определить ничью;
        }
    }
}

// Функция проверки, есть ли ничья или нет;

function checkFish(cells) {
    let countTd = 0;

    for(let i = 0; i < cells.length; i++) {
        if(cells[i].innerHTML != '') {
            countTd += 1;
        }
    }

    if(countTd >= 9) {
        parForUser.innerHTML = "Ничья!";
        ifWinner = true;
        plusForUser('fish');
    }
}

// Функция отмены события клика по всем ячейкам; Активируется после окончания раунда;

function prepareFunc(cells) {

    for(let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', clickOnTd);
    }
}

// Функция счетчик - добавляет очки игрокам в случае выигрыша или ничьей;

function plusForUser(user) {
    if(user == 'X') {
        parForCross.innerHTML = Number(parForCross.innerHTML) + 1;
    }
    else if(user == 'O') {
        parForNull.innerHTML = Number(parForNull.innerHTML) + 1;
    }
    else if(user == 'fish') {
        parForFish.innerHTML = Number(parForFish.innerHTML) + 1;
    }
}

// Кнопка сброса

function reset() {
    let cells = document.querySelectorAll('.cell');

    for(let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';

        cells[i].addEventListener('click', clickOnTd);
    }
}

buttonReset.addEventListener('click', reset);

// Запуск основного процесса;

createTable();
