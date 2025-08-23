const input = document.getElementById("input")
const date = document.getElementById("input-date")
const listContainer = document.getElementById("list-container");


function addTodo(){
    const inputVal = input.value.trim();
    const dateVal = date.value;
    switch(true){
        case inputVal === "" || dateVal === "":
        alert("You must type a to-do and input a date!");
        break;

    default:
        let li = document.createElement("li");
        li.innerHTML = inputVal + " | " + dateVal;
        listContainer.appendChild(li)

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"
        li.appendChild(span)
    }
    saveData();
    showTodo();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName ==="SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false)

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function clearConf(){
    const inputVal = input.value.trim();
    const dateVal = date.value;
    if (inputVal === "" || dateVal === ""){
        alert("You need to have atleast one to-do")
    }
    else{
        let clearConfirm = confirm('Are you sure you want to delete all to-dos?');
        switch(clearConfirm){
            case true:
                clearTodos();
                break;

            default:
                break;
        }
    }
}

function clearTodos(){
    localStorage.clear();
    showTodo();
}

function showTodo(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTodo();