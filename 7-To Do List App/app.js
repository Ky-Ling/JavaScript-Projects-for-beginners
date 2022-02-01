/*
 * @Date: 2022-01-28 21:42:54
 * @LastEditors: GC
 * @LastEditTime: 2022-01-30 14:44:52
 * @FilePath: \Projects\7-To Do List App\app.js
 */

// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos); 
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addToDo(event) {
    // Prevent form from submitting
    event.preventDefault();

    // Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create li
    const newToDo = document.createElement("li");
    newToDo.innerText = todoInput.value;
    newToDo.classList.add("todo-item");

    todoDiv.appendChild(newToDo);

    // Add todo to local storage
    saveLocalTodos(todoInput.value);


    // Check mark button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = "<i class = 'far fa-check-square'></i>";
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    // Check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class = 'fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append to list
    todoList.appendChild(todoDiv);

    // Clear todoInput value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    // Delete todo
    if(item.classList[0] == "trash-btn") {
        const todo = item.parentElement;

        // Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        })
    }

    // Check mark
    if(item.classList[0] == "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
     
}

function saveLocalTodos(todo) {
    // Check ---> Hey, do I already have thing in there?
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo) {
        // Create todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Create li
        const newToDo = document.createElement("li");
        newToDo.innerText = todo;
        newToDo.classList.add("todo-item");

        todoDiv.appendChild(newToDo);

        // Check mark button
        const completeButton = document.createElement("button");
        completeButton.innerHTML = "<i class = 'far fa-check-square'></i>";
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);

        // Check trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class = 'fas fa-trash'></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // Append to list
        todoList.appendChild(todoDiv);
        })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex, 1))
    localStorage.setItem("todos", JSON.stringify(todos));
}