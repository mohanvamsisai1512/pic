let inputElement = document.getElementById("todoUserInput");
let addButton = document.getElementById("addTodoButton");
let saveButton = document.getElementById("saveTodoButton");
let darkmodebutton = document.getElementById("darkmodebutton");
let maincontainer = document.getElementById("maincontainer");
let todoItemsContainer = document.getElementById("todoItemsContainer");
let icons1 = document.getElementById("icons1");
let icon1text = document.getElementById("icon1text");
let todoList = [];
let id = 0;

function isValidJSON(data) {
    try {
        JSON.parse(data);
        return true;
    } catch (e) {
        return false;
    }
}

function onTodoStatusChange(checkboxId, labelId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);

    labelElement.classList.toggle('checked');
}

function deleteTodo(taskId) {
    let listItem = document.getElementById("listitem" + taskId);
    todoItemsContainer.removeChild(listItem);

    todoList = todoList.filter(function(todoObject) {
        return todoObject.taskid !== taskId;
    });

    saveTodos();
}

function saveTodos() {
    let stringifiedTodoList = JSON.stringify(todoList);
    localStorage.setItem("m", stringifiedTodoList);
}

function appendTodoElement(todoObject) {
    let listItemContainer = document.createElement("li");
    listItemContainer.classList.add("todo-item-container", "d-flex", "flex-row");
    listItemContainer.id = "listitem" + todoObject.taskid;
    todoItemsContainer.appendChild(listItemContainer);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox-input");
    checkbox.id = "checkbox" + todoObject.taskid;
    listItemContainer.appendChild(checkbox);

    let labelContainer = document.createElement("p");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    listItemContainer.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.textContent = todoObject.tobedone;
    labelElement.classList.add("checkbox-label");
    labelElement.setAttribute("for", "checkbox" + todoObject.taskid);
    labelElement.id = "labelid" + todoObject.taskid;
    labelContainer.appendChild(labelElement);

    checkbox.onclick = function() {
        onTodoStatusChange(checkbox.id, labelElement.id);
    };

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    // Attach event handler to delete the item and update local storage
    deleteIcon.onclick = function() {
        deleteTodo(todoObject.taskid);
    };

    deleteIconContainer.appendChild(deleteIcon);
}

function appendTodo() {
    if (inputElement.value === "") {
        alert("Please enter a valid input");
        return;
    }
    id = id + 1;
    let task = inputElement.value;

    let todoObject = {
        tobedone: task,
        taskid: id
    };
    todoList.push(todoObject);

    appendTodoElement(todoObject);

    inputElement.value = "";
}

addButton.onclick = function() {
    appendTodo();
};

saveButton.onclick = function() {
    saveTodos();
};

// Load tasks from local storage immediately when the script runs
let storedTodoList = localStorage.getItem("m");
if (storedTodoList && isValidJSON(storedTodoList)) {
    todoList = JSON.parse(storedTodoList);
    todoList.forEach(function(todoObject) {
        appendTodoElement(todoObject);
    });
} else {
    // If invalid JSON is detected or no stored data is found, initialize as an empty list
    todoList = [];
}

// Dark Mode toggle


icons1.classList.add("fa-solid", "fa-moon", "icons");
icon1text.textContent = "Dark mode";
darkmodebutton.classList.add("btn", "btn-primary");


let m = parseInt(localStorage.getItem("items1")) || 0;




function darklight() {
    m++ 
    localStorage.setItem("items1",m);  
    
    if (m % 2 === 0) {
        // Light Mode
        darkmodebutton.classList.remove("btn", "btn-warning");
        darkmodebutton.classList.add("btn", "btn-primary");
        maincontainer.classList.remove("todos-bg-container2");
        maincontainer.classList.add("todos-bg-container");
        icons1.classList.remove("fa-solid", "fa-sun");
        icons1.classList.add("fa-solid", "fa-moon");
        icon1text.textContent = "Dark Mode";
        todos.style.color = "black";
        createtask.style.color = "black";
        document.getElementById("mytasks").style.color = "black";
        addButton.style.backgroundColor = "#4c63b6";
        addButton.style.color = "white";
        saveButton.style.backgroundColor = "#4c63b6";
        saveButton.style.color = "white";
        

    } else {

        darkmodebutton.classList.remove("btn", "btn-primary");
        darkmodebutton.classList.add("btn", "btn-warning");
        maincontainer.classList.remove("todos-bg-container");
        maincontainer.classList.add("todos-bg-container2");
        icons1.classList.remove("fa-solid", "fa-moon");
        icons1.classList.add("fa-solid", "fa-sun");
        icon1text.textContent = "Normal Mode";
        todos.style.color = "white";
        createtask.style.color = "white";
        document.getElementById("mytasks").style.color = "white";
        addButton.style.backgroundColor = "#FFC107";
        addButton.style.color = "black";
        saveButton.style.backgroundColor = "#FFC107";
        saveButton.style.color = "black";
        
        
    }
}  

m++ ;
localStorage.setItem("items1",m);
darklight();
