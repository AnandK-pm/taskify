// Function to create a new task element
let addbut=document.querySelector(".add");
let newtask=document.querySelector(".new");
let addtask=document.querySelector(".tasks");
let dltall=document.querySelector(".dltall");
let taskEdit=false;
function createTaskElement(taskText) {
    const task = document.createElement("div");
    task.classList.add("task");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.classList.add("check");

    const close = document.createElement("button");
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-trash-alt");
    close.appendChild(closeIcon);
    closeIcon.classList.add("close");
    close.classList.add("close");

    const edit = document.createElement("button");
    const editIcon = document.createElement("i");
    editIcon.classList.add("fas", "fa-pencil-alt");
    edit.appendChild(editIcon);
    editIcon.classList.add("edit");
    edit.classList.add("edit");

    const taskTextElement = document.createElement('label');
    taskTextElement.classList.add("taskText");
    taskTextElement.textContent = taskText;

    const left = document.createElement("div");
    left.appendChild(check);
    left.appendChild(taskTextElement);
    left.classList.add("left");

    const right = document.createElement("div");
    right.appendChild(close);
    right.appendChild(edit);
    right.classList.add("right");

    task.appendChild(left);
    task.appendChild(right);

    return task;
}

// Function to handle adding a new task
function addTask() {
    const newTaskValue = newtask.value.trim();

    if (newTaskValue !== '') {
        let taskExists = false;
        const duplicates = document.querySelectorAll(".taskText");
        for (const duplicate of duplicates) {
            if (duplicate.textContent === newTaskValue) {
                taskExists = true;
                break;
            }
        }

        if (!taskExists && !taskEdit) {
            const task = createTaskElement(newTaskValue);
            addtask.appendChild(task);


            const checkbox = task.querySelector(".check");
            checkbox.addEventListener("change", function() {
                const taskElement = this.closest('.task');
                if (this.checked) {
                    taskElement.classList.add("strikethrough");
                } else {
                    taskElement.classList.remove("strikethrough");
                }
            });

            newtask.value = '';
        }

    }
}

// Function to handle editing a task
function editTask(taskTextElement) {
    newtask.value = taskTextElement.textContent;
    newtask.focus();
    taskEdit = true;
    addbut.textContent='edit';

    const editHandler = () => {
        if (taskEdit) {
            taskTextElement.textContent = newtask.value;
            addbut.textContent = "+";
            taskEdit = false;
            newtask.value = '';
            addbut.removeEventListener("click", editHandler);
        }
    };

    addbut.addEventListener("click", editHandler);
    newtask.addEventListener("keydown",(event) => {
        if (event.keyCode === 13) {
            addbut.click();
        }});
}

const editButtons = document.querySelectorAll(".edit");
editButtons.forEach(editButton => {
    editButton.addEventListener("click",editTask)})

addbut.addEventListener("click", addTask);
newtask.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        addTask();
    }
});
dltall.addEventListener("click", () => {
    const allTasks = document.querySelectorAll(".task");
    allTasks.forEach(task => {
        task.remove();
    });
});
addtask.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit")) {
        const taskElement = e.target.closest('.task');
        const taskTextElement = taskElement.querySelector(".taskText");
        editTask(taskTextElement);
    }
    else if (e.target.classList.contains("close")) {
        const taskElement = e.target.closest('.task');
        taskElement.remove();
    }
});