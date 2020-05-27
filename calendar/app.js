const mainTable = document.querySelector('.cal__base'),
    rowWithDayofWeek = document.querySelector('.days'),
    parForDisplayCurDate = document.querySelector('.header__date'),
    pvBtn = document.querySelector('.header__prev-btn'),
    nxBtn = document.querySelector('.header__next-btn');

let globalIteration = 1,
    currentDate = new Date(),
    currentYear = currentDate.getFullYear(),
    currentMonth = currentDate.getMonth();


// Основная функция для запуска ===============================================

function getCalandar() {
    createDate(currentYear, currentMonth, mainTable);
    displaySelectData(currentYear, currentMonth);
    selectCurrentDate(currentYear, currentMonth);
}

// Создает календарь и добавляет его в таблицу ===============================

function createDate(year, month, elem) {

    for(let w = 0; w < getCountWeeks(year, month); w++){
        let tr = document.createElement('tr'),
            lastDayOfMonth = getLastDayOfMonth(year, month),
            checkDateFirsr = new Date(year, month, 1).getDay(),                              // Узнает день недели первого числа месяца
            checkDateLast = new Date(year, month, getLastDayOfMonth(year, month)).getDay(),    // Узнает день недели последнего числа месяца          
            iterForFirst = 8 - checkDateFirsr,
            iterForLast = checkDateLast;

            tr.classList.add('generate-dates');


        if(w == 0 && checkDateFirsr > 1){                                                  // Проверка первой недели месяца
            checkFirstLastDay(checkDateFirsr, tr);
            createStandartWeek(1, tr, iterForFirst);                                         // Запуск проверки на понедельник
        }
        else if(w == 0 && checkDateFirsr == 0) {                                        // Если первый день это воскресенье
            checkFirstLastDay(7, tr);
            createStandartWeek(1, tr, 1);    
        }

        else if(w == (getCountWeeks(year, month) - 1) && checkDateLast != 0) {      // Последняя неделя месяца
                    
            createStandartWeek(globalIteration, tr, iterForLast, getLastDayOfMonth(year, month));
        }

        else {
            createStandartWeek(globalIteration, tr);
        }
        

    elem.append(tr);
    }
}

// Под функция по создаю календаря, генерирует стандартный набор ячеек с днями недели в которых добавленны числа

function createStandartWeek(start, tr, iter = 7, end) {
    let finish = iter + start;
    
    if(finish > end) {
        finish = end + 1;
    }

    for(let i = start; i < finish; i++) {
        

        let td = document.createElement('td');

        td.classList.add('base-td');
        td.addEventListener('click', clickOnDate);
            
        td.innerHTML = i;
        td.style.cssText = 'width: 20px; text-align: center;';
        
        tr.append(td);
        globalIteration++;
    }
}

// Под функция используемая для создания пустых ячеек для первой и последней недели

function checkFirstLastDay(date, tr) {
   if(date != 1) {
        let exstraTd = document.createElement('td');
        exstraTd.style.cssText = 'width: 20px';

        tr.append(exstraTd);
        checkFirstLastDay(date - 1, tr);
    }
}

// Функция очистки таблицы =============================================================

function cleanTable() {
    let calendar = document.querySelectorAll('.generate-dates');
    
    for(let i = 0; i < calendar.length; i++) {
        calendar[i].remove();
    }
}

// Функция вывода выбранного месяца и года в заголовок календаря=========================

function displaySelectData(year, month) {
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    parForDisplayCurDate.innerHTML = `${year} ${months[month]}`;
}

// Отметить текущую дату ==================================================================

function selectCurrentDate(currentYear, currentMonth) {
    let days = document.querySelectorAll('.generate-dates td'),
        curDay = currentDate.getDate(),
        curMon = currentDate.getMonth(),
        currentY = currentDate.getFullYear();
    
    if(currentYear == currentY && currentMonth == curMon) {
        for(let i = 0; i < days.length; i++) {
            if(days[i].innerHTML == curDay) {
                days[i].style.background = 'black';
                days[i].style.color = 'white';
            }
        }
    }
}

// Кнопки управления ======================================================================

function next() {
    cleanTable();
    currentMonth++;
    
    if(currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    globalIteration = 1

    createDate(currentYear, currentMonth, mainTable);
    displaySelectData(currentYear, currentMonth);
    selectCurrentDate(currentYear, currentMonth);
    selectDateWithTasks(tasks);
}

function prev() {
    cleanTable();
    currentMonth--;
    
    if(currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    globalIteration = 1

    createDate(currentYear, currentMonth, mainTable);
    displaySelectData(currentYear, currentMonth);
    selectCurrentDate(currentYear, currentMonth);
    selectDateWithTasks(tasks);
}

//Дополнительные функции вычисления дней недели и тд ======================================

function getLastDayOfMonth(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
}

function getCountWeeks(year, month) {
  let l = new Date(year, month + 1, 0);
  return Math.ceil( (l.getDate() - (l.getDay()?l.getDay():7))/7 ) + 1;
 }

// Cобытия на кнопок управления вперед и назад ======================================

pvBtn.addEventListener('click', prev);
nxBtn.addEventListener('click', next);

// Функция органайзера ====================================================================

const tasks = {
                '2020.4.24': { 
                                'task': [
                                    'Доделать календарь',
                                    'Протестировать органайзер',
                                    'Сделать коммит' 
                                    ],
                                'status': true
                            },

                '2020.4.28': {
                                'task': [
                                    'Проверить задачи',
                                    'Сделать задачи',
                                    ],
                                'status': true
                            },

                '2020.5.20': {
                                'task': [
                                    'Проверить почту',
                                    'Ответить письма',
                                    'Сделать проверку репозитория' 
                                    ],
                                'status': true
                            },

                '2020.6.21': {
                                'task': [
                                    'Отдохнуть',
                                    'Перебрать код',
                                    'Сделать коммит' 
                                    ],
                                'status': true
                            }
},
    textareaForTask = document.querySelector('.tasks'),
    addTaskBtn = document.querySelector('.task__add'),
    doneTaskBtn = document.querySelector('.task__done'),
    removeTaskBtn = document.querySelector('.task__remove');

let selectDay = '';

// Основная функция которая запускает перебор задач

function selectDateWithTasks(tasks) {
    let keys = Object.keys(tasks);

    for(let i = 0; i < keys.length; i++) {
        let arrDate = keys[i].split('.');
            testYear = arrDate[0],
            testMonth = arrDate[1],
            testDay = arrDate[2];

        if(testYear == currentYear && testMonth == currentMonth) {
            let days = document.querySelectorAll('.generate-dates td');

            for(j = 0; j < days.length; j++) {
                if(days[j].innerHTML == testDay) {

                    days[j].style.border = 'red 1px solid';
                    
                    days[j].addEventListener('click', function() {
                        displayTaskList(tasks[keys[i]]);
                    });
                    
                }
            }
        }
    }
}

// Подфункция события нажатия по дню с задачей, отображает ниже список с задачами и добавляет их в блок

function displayTaskList(task) {
    textareaForTask.value = '';
    textareaForTask.style.display = 'block';

    for(let i = 0; i < task['task'].length; i++) {
        textareaForTask.value += `${task['task'][i]} \n`;
    }

    if(task['status']) {
        textareaForTask.style.textDecoration = 'none';
    }
    else textareaForTask.style.textDecoration = 'line-through';
}

// Событие клика по любой ячейки с датой; Очищает задачи; Очищает предыдущее выделение; Прогоняет проверку дат с задачи;
// Ставит новое выделение на активной дате, которая сейчас выбрана;

function clickOnDate() {
    let days = document.querySelectorAll('.generate-dates td');

    addTaskBtn.style.display = 'block';
    doneTaskBtn.style.display = 'block';
    removeTaskBtn.style.display = 'block';

    textareaForTask.style.display = 'block';
    textareaForTask.value = '';
    selectDay = this;
    
    for(let i = 0; i < days.length; i++) {
    
        if(days[i].style.border == '1px solid blue') {
            days[i].style.border = 'none';
        }
    }

    selectDateWithTasks(tasks);

    this.style.border = 'blue 1px solid';
}

// Событие клика по кнопке добавления задачи и функция добавления =====================================

addTaskBtn.addEventListener('click', addTaskToObject);

function addTaskToObject() {
    let generateSelectDate = `${currentYear}.${currentMonth}.${selectDay.innerHTML}`,
        arrWithTasksAdd = textareaForTask.value.split('\n'),
        objectWithTask = {task: arrWithTasksAdd,
                        status: true}

    tasks[generateSelectDate] = objectWithTask;
    
    selectDateWithTasks(tasks);
}

// Событие клика по кнопке задача выполнена и функция перечеркивания ==================================

doneTaskBtn.addEventListener('click', doneTask);

function doneTask() {
    let generateSelectDate = `${currentYear}.${currentMonth}.${selectDay.innerHTML}`;

    tasks[generateSelectDate]['status'] = false;

    textareaForTask.style.textDecoration = 'line-through';

    selectDateWithTasks(tasks);
}

// Первый старт, формирование начального месяца=====================================================

getCalandar();
selectDateWithTasks(tasks);