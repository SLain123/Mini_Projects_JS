const canvas = document.querySelector('.can');
const ctx = canvas.getContext('2d');
const radius = 10;
let mouseDown = false;
let corArr = [];

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

const saveDrowing = () => {
    localStorage.setItem('drawing', JSON.stringify(corArr));
    console.log('You saved drawing');
};

const paintDrowing = () => {
    try {
        const corArrLocal = JSON.parse(localStorage.getItem('drawing'));
        const timer = setInterval(() => {
            if(!corArrLocal.length) {
                clearInterval(timer);
            } else {
                let cor = corArrLocal.shift();
                let corObj = {
                    x: cor[0],
                    y: cor[1]
                };
        
                getDrowing(corObj.x, corObj.y);
                }
            }, 10);
    }
    catch {
        console.log('No save drawing');
    }
};

const cleanDrowing = () => {
    localStorage.setItem('drawing', []);
    console.log('You cleaned drawing');
};

const getDrowing = (x, y) => {
    ctx.lineWidth = radius;
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.arc(x, y, radius / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.lineTo(x, y);
    ctx.stroke();
};

canvas.addEventListener('mousedown', e => {
    mouseDown = true;
});

canvas.addEventListener('mouseup', e => {
    mouseDown = false;
    ctx.beginPath();
    corArr.push('up');
});

canvas.addEventListener('mousemove', e => {
    let x = e.clientX;
    let y = e.clientY;

    if(mouseDown) {
        corArr.push([x, y]);
        getDrowing(x, y);
    }
});

document.addEventListener('keydown', e => {
    if(e.key === 's') {
        saveDrowing();
    }
    if(e.key === 'p') {
        paintDrowing();
    }
    if(e.key === 'c') {
        cleanDrowing();
    }
});

console.log('s - save drowing, \np - play, redrowing, \nc - clean save drowing');