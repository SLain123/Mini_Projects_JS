/* The Snake

Обозначамем переменные  =================================================*/

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const scoreBlock = document.querySelector('.score');
const textDead = document.querySelector('.area');
const resetBtn = document.querySelector('.reset-btn');

// Графика

const bgImg = new Image();
bgImg.src = '../img/bg.png';

const headImg = new Image();
headImg.src = '../img/head.png';

const foodImg = new Image();
foodImg. src = '../img/food.png';

const bodyImg = new Image();
bodyImg.src = '../img/body.png';

// Аудио

const scorePlusAudio = new Audio();
scorePlusAudio.src = '../audio/plus.mp3';

const deadAudio = new Audio();
deadAudio.src = '../audio/dead.mp3';

// Вспомогательные переменные

let box = 50;
let score = 0;
let move;

// Размер поля

const widthArea = 24;
const heigthArea = 20;

// Координаты

let food = {
    x: generateRandome(1, widthArea) * box,
    y: generateRandome(1, heigthArea) * box
}

let snake = [];
snake[0] = {
    x: 12 * box,
    y: 10 * box
}

// Функция генерации рандомных чисел =================================

function generateRandome(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

// Основная функция отрисовки ========================================

function drawGame() {
    ctx.drawImage(bgImg, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);
    
    for(let i = 0; i < snake.length; i++) {   // отрисовываем голову и туловище змеи
        if(i == 0) {
            ctx.drawImage(headImg, snake[i].x, snake[i].y);
        }
        else {
            ctx.drawImage(bodyImg, snake[i].x, snake[i].y);
        }
    }

    let snakeX = snake[0].x;           // генерируем отрисованную змею
    let snakeY = snake[0].y;

    scoreBlock.innerHTML = `Текущий счет: ${score}`;

    if(snakeX == food.x && snakeY == food.y) {  // проверка съела ли змея еду
        score++;
        scorePlusAudio.play();
        food = {
            x: generateRandome(1, widthArea) * box,
            y: generateRandome(1, heigthArea) * box
        }

    }
    else snake.pop();

    if(snakeX < box || snakeX > box * widthArea || snakeY < box || snakeY > box * heigthArea) { // проверка столкновения с бортом
        clearInterval(startDraw);
        deadAudio.play();
        textDead.style.display = 'flex';

    } 

    if(move == 'left') snakeX -= box;       // проверка направления
    if(move == 'right') snakeX += box;
    if(move == 'up') snakeY -= box;
    if(move == 'down') snakeY += box;

    let newHead = {                        // координаты нового шага
        x: snakeX,
        y: snakeY
    }

    destroyYourself(newHead, snake);

    snake.unshift(newHead);          // добавляем координаты нового шага в массив координат
}

// Функция проверка столкновения со своим туловищем или хвостом

function destroyYourself(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(startDraw);
            deadAudio.play();
            textDead.style.display = 'flex';
        }
    }
}

// Событие нажатия клавишы и функция движения =========================

document.addEventListener('keydown', moveTo);

function moveTo(event) {
    if(event.keyCode == '37' && move != 'right') {
        move = 'left';
    }
    else if(event.keyCode == '38' && move != 'down') {
        move = 'up';
    }
    else if(event.keyCode == '39' && move != 'left') {
        move = 'right';
    }
    else if(event.keyCode == '40' && move != 'up') {
        move = 'down';
    }

}

// Запуск основной функции по таймеру ===============================

let startDraw = setInterval(drawGame, 200);

// Перезапуск игры, событие кнопки и функция =======================

resetBtn.addEventListener('click', resetAll);

function resetAll() {
    textDead.style.display = 'none';

    snake = [];
    snake[0] = {
        x: 12 * box,
        y: 10 * box
    };

    score = 0;
    move = null;

    startDraw = setInterval(drawGame, 200);
}