/* Game bird
Опеределение основных переменных */

const cnv = document.querySelector('.cnv');
const ctx = cnv.getContext('2d');

const bird = new Image();
const bg = new Image();
const pipeUp = new Image();
const pipeDown = new Image();
const gameBottom = new Image();

bird.src = './img/bird.png';
bg.src = './img/bg.png';
pipeUp.src = './img/pipeUp.png';
pipeDown.src = './img/pipeDown.png';
gameBottom.src = './img/bottom.png';

const plusScore = new Audio();

plusScore.src = './audio/score.mp3';

let gap = 110;
let xBird = 10;
let yBird = 200;
let gravity = 2;

let score = 0;

// Массив с координатами труб (препятствий);

let pipe = [];
pipe[0] = {
    x: cnv.width,
    y: 0
};

// Функция вывода изображения на экран;

function draw() {

    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < pipe.length; i++) {       // цикл который генерирует препятсвия и наполняет массив препятствий;
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + (pipeUp.height + gap));

        pipe[i].x--;

        if(pipe[i].x == 80) {
            pipe.push({
                x: cnv.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

         // Отслеживание прикосновений
        if(xBird + bird.width >= pipe[i].x
            && xBird <= pipe[i].x + pipeUp.width
            && (yBird <= pipe[i].y + pipeUp.height
            || yBird + bird.height >= pipe[i].y + pipeUp.height + gap) || yBird + bird.height >= cnv.height - gameBottom.height) {
                location.reload(); // Перезагрузка страницы
            }

        if(pipe[i].x == 2) {
            score++;
            plusScore.play();
        }
    } 

    ctx.drawImage(gameBottom, 0, cnv.height - gameBottom.height);
    ctx.drawImage(bird, xBird, yBird);

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cnv.height - 20);

    yBird += gravity;
    requestAnimationFrame(draw);
}

// Событие нажатия любой клавишы;

document.addEventListener('mousedown', function() {
    yBird -= 30;
});

// Запуск основной функции после загрузки последней картинки;

const startBtn = document.querySelector('.start-btn');

startBtn.addEventListener('click', function() {
    startBtn.style.display = 'none';
    draw();
})