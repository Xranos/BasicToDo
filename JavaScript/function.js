const LS_KEY = "todos";

function show(val) {
  const box = document.getElementById("input-dropdown");
  box.value = val;                 
  displayTodos();          
  const wrapper = box.closest('.dropdown');
  if (wrapper) wrapper.classList.remove('active');
}

function changeFilter() {
    const valueDropdown = document.getElementById('input-dropdown').value;
    displayTodos();
}


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
    const input = document.getElementById("input");
    const date  = document.getElementById("input-date");
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
    saveTodos([]);
    displayTodos();
}

function getOrder() {
  const el = document.getElementById("input-dropdown");
  const v = (el && el.value ? el.value : "Newest").trim().toLowerCase();
  console.log("Current dropdown value:", v); // Debug log
  return v.startsWith("new") ? "newest" : "oldest";
}


function displayTodos() {
    const listContainer = document.getElementById("list-container");

    listContainer.innerHTML = "";
    if (!listContainer) {
        console.log("List container not found!");
        return;
    }
    let todos = loadTodos();

  const order = getOrder();

   console.log("order:", order, "before:", todos.map(t => t.dueDate));

  todos.sort((a, b) =>
    order === "newest"
      ? b.dueDate.localeCompare(a.dueDate)   // later dates first
      : a.dueDate.localeCompare(b.dueDate)   // earlier dates first
  );

   console.log("after:", todos.map(t => t.dueDate));

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


