const input = document.getElementById("input");
const date = document.getElementById("input-date");
const listContainer = document.getElementById("list-container");
const LS_KEY = "todos";

function loadTodos() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
function saveTodos(arr) {
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
}

function addTodo(){
    const inputVal = input.value.trim();
    const dateVal = date.value;

    if(inputVal === "" || dateVal === ""){
        alert("You must type a to-do and input a date!");
        return;
    }

    let todos = loadTodos();
    todos.push({task: inputVal, dueDate: dateVal})
    saveTodos(todos);

    input.value = "";
    date.value = "";
    displayTodos();
}

function clearTodos(){
    todos = [];
    saveTodos(todos);
    displayTodos();
}


function displayTodos() {
    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = "";

    let todos = JSON.parse(localStorage.getItem("todos")) || [];


  todos.forEach((item, index) => {
    const todoItem = document.createElement("li");
    todoItem.className = "todo-item";

    const taskSpan = document.createElement("span");
    taskSpan.className = "task";
    taskSpan.textContent = `${item.task} - ${item.dueDate}`;

    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";

    const editButton = document.createElement("button");
    editButton.className = "edit-btn";
    editButton.textContent = "✏️";
    editButton.onclick = () => editTodo(index);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "✖";
    deleteButton.onclick = () => deleteTodo(index);

    btnGroup.appendChild(editButton);
    btnGroup.appendChild(deleteButton);

    todoItem.appendChild(taskSpan);
    todoItem.appendChild(btnGroup);

    listContainer.appendChild(todoItem);
  });
}

function deleteTodo(index) {
    const todos = loadTodos();
    if (index >=0 && index < todos.length) {
        todos.splice(index, 1);
        saveTodos(todos);
        displayTodos();
    }
}


function clearConf(){
    const todos = loadTodos();
    if(todos.length === 0){
        alert("No to-dos to clear!");
        return;
    }

    const confirmation = confirm("Are you sure you want to clear all to-dos?");
    if(confirmation){
        clearTodos();
    }
}

document.addEventListener("DOMContentLoaded", displayTodos);



