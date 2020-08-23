'use strict';

const arrOfAllElements = document.getElementsByTagName('*');
const objOfAllCountElements = {};
const sortArrOfClasses = [];

// Функция возвращает все классы на странице;

const getAllClasses = () => {
    let arrOfAllClassNames = [];
    for(let i = 0; i < arrOfAllElements.length; i++) {
        if(arrOfAllElements[i].classList.length > 0) {
            let arrClass = arrOfAllElements[i].classList;
            for(let j = 0; j < arrClass.length; j++) {
                arrOfAllClassNames.push(arrClass[j]);
            }
        }
    }
    return arrOfAllClassNames;
};

// Функция формирует объект с классами, в свойствах каждого из классов указано количество его повторений;

const getCountRepeatClass = arr => {
    for(let i = 0; i < arr.length; i++) {
        let count = 0;
        for(let j = 0; j < arr.length; j++) {
            if(checkEqual(arr[i], arr[j])) {
                count++;
            }
        }
        objOfAllCountElements[arr[i]] = count;
    }
};

// подФункция сравнивает два значений и возвращает истину если равны;
const checkEqual = (first, second) => {
    if (first === second) {
        return true;
    }
    else {
        return false;
    }
};

// Функция возвращает массив со всеми классами отсортированный согласно количеству повторений на основе информации из объекта

const createSortArr = obj => {
    let max = checkMax(obj);
    for(let prop in obj) {
        if(obj[prop] === max) {
            sortArrOfClasses.push(prop);
            delete objOfAllCountElements[prop];
        }
    }
    if(Object.keys(objOfAllCountElements).length > 0) {
        createSortArr(objOfAllCountElements);
    }
};

// подФункция находит максимальное число в свойствах переданного объекта;
const checkMax = obj => {
    let max = 0;
    for(let prop in obj) {
        if(max < obj[prop]) {
            max = obj[prop];
        }
    }
    return max;
};

// Функция генерирует массив коротких имен для классов по типу А_0, А_1 и возвращает его;

const generateShortNames = (howMuch) => {
    let codeLetter = 65;
    let count = 0;
    let result = [];
    for(let i = 0; i < howMuch; i++) {
        if(codeLetter > 90) {
            codeLetter = 65;
            count++;
        }
        let letter = String.fromCharCode(codeLetter); 
        result.push(`${letter}__${count}`);
        codeLetter++;
    }
    return result;
};

// Функция заменяет имя переданного класса на новое имя;

const changeClass = (className, newName) => {
    for(let elem of arrOfAllElements) {
        if(elem.classList.contains(className)) {
            elem.classList.remove(className);
            elem.classList.add(newName);
        }
    }
};

// Функция запускает замену всех классов на сайте на сгенрированный массив имен аналогичного колличества;

const changeAllClasses = () => {
    const howMuchLenght = sortArrOfClasses.length;
    const arrOfNewName =generateShortNames(howMuchLenght);
    sortArrOfClasses.forEach((name, indx) => {
        changeClass(name, arrOfNewName[indx]);
    });
};


// Запуск;
getCountRepeatClass(getAllClasses());
createSortArr(objOfAllCountElements);
changeAllClasses();