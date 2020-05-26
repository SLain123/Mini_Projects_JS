const mainInput = document.querySelector('.i-main'),
    container = document.querySelector('.container');

mainInput.addEventListener('keyup', () => {
    enter(event);
});

// Check: user push ENTER?

function enter(event) {
    if(event.key == 'Enter') {
        createTask();
    }
}

// Main func which launch all functions for create and contain task-block

function createTask() {
    let block = createBlock();

    block.append(createCheckbox());
    block.append(parForTask())
    block.append(createCloseBtn());

    mainInput.value = '';

    container.append(block);
}

// Create elements for task

function createBlock() {
    let block = document.createElement('div');
    block.classList.add('block-task');
    return block;
}


function createCheckbox() {
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('checkbox');
    checkbox.addEventListener('click', activateCheckbox);

    return checkbox;
}

function parForTask() {
    let taskText = document.createElement('p');
    taskText.innerHTML = mainInput.value;
    taskText.classList.add('task-text');
    taskText.addEventListener('dblclick', editTask);

    return taskText;
}

function createCloseBtn() {
    let closeBtn = document.createElement('button');
    closeBtn.classList.add('remove-btn');
    closeBtn.innerHTML = 'X';
    closeBtn.addEventListener('click', removeTask);

    return closeBtn;
}

// Event for CHECKBOX

function activateCheckbox() {
    this.nextSibling.style.textDecoration = 'line-through';
    this.style.visibility = 'hidden';
    this.nextSibling.removeEventListener('dblclick', editTask);
}

// Event for remove BUTTON

function removeTask() {
    this.parentElement.remove();
}

// Event for edit task double click

function editTask() {
   if(this.nextSibling.classList.contains('input-for-edit')) {
        this.nextSibling.style.display = 'block';
   }
   else {
        let currentTaskText = this.innerHTML,
            inputForEdit = document.createElement('input');

        inputForEdit.classList.add('input-for-edit');
        inputForEdit.value = currentTaskText;
        inputForEdit.addEventListener('blur', () => {
            saveTask(event);
        });
        inputForEdit.addEventListener('keyup', (event) => {
            if(event.key == 'Enter') {
                saveTask(event);
            }
        });

        this.after(inputForEdit);
   }
   this.style.display = 'none';
}

// Event for EDIT Input (save edit task)

function saveTask(event) {
    let elem = event.target;

    elem.previousSibling.innerHTML = elem.value;
    elem.previousSibling.style.display = 'block';
    elem.style.display = 'none';
}
