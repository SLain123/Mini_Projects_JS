const arrMain = [
	{
		question: 'Где прячется кошка?',
		answers: [
			'На дереве',
			'В траве',
			'В сарае',
			'В болоте',
			'В кустах',
		],
		right: 0,
	},
	{
		question: 'Какое любимое кошачье блюдо?',
		answers: [
			'Корм с ягненком',
			'Корм с лососем',
			'Свежая рыба',
			'Апельсин',
            'Трава',
            'Кошка есть все подряд'
		],
		right: 5,
	},
	{
		question: '(2+2)*2=...',
		answers: [
			'2',
			'8',
			'16',
			'4',
		],
		right: 1,
	},
],
blockForTest = document.querySelector('.test');

createTest();

function createTest() {
    for(let i = 0; i < arrMain.length; i++) {
		let block = document.createElement('div');
		block.classList.add(`group-number-${i}`);
        block.append(createQuestion(arrMain[i].question));
        createAnswers(arrMain[i].answers, arrMain[i].right, block, i);
		blockForTest.append(block);
    }
	blockForTest.append(createCheckBtn());
}

function createQuestion(textQuestion) {
    let par = document.createElement('p');
    par.innerHTML = textQuestion;
    return par;
}

function createAnswers(arr, arrValue, elem, id) {
    for(let i = 0; i < arr.length; i++) {
        elem.insertAdjacentHTML('beforeend', `<label><input type='radio' value='${i}' id='answer${id}${i}' name='${id}'></label>
        <label for='answer${id}${i}'>${arr[i]}</label>
        <br>`);
    }
}

function createCheckBtn() {
	let button = document.createElement('button');

	button.innerHTML = 'Finish Test';
	button.style.margin = '20px 0';
	button.addEventListener('click', finishTest);
	button.classList.add('check-btn');

	return button;
}

function finishTest() {
	let checkBtn = document.querySelector('.check-btn');

	for(let i = 0; i < arrMain.length; i++) {
		let right = arrMain[i].right,
			testGroup = document.querySelector(`.group-number-${i}`);
		checkRight(right, testGroup);
	}
	checkBtn.setAttribute('disabled', '');
}

function checkRight(rightAnswer, testGroup) {
	let inputs = testGroup.querySelectorAll('input');

	for(let i = 0; i < inputs.length; i++) {
		if(inputs[i].value == rightAnswer && inputs[i].checked) {
			inputs[i].parentElement.nextElementSibling.style.color = 'green';
		}
		else if(inputs[i].checked) {
			inputs[i].parentElement.nextElementSibling.style.color = 'red';
		}
	}
}