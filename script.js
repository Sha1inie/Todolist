// variables for the input field and button
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

//To add task and save it 
function AddTask() {
    if (inputBox.value === '') {
        alert("I think you forgot to add your task?!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

//to check teh task in list <3
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Double click function to edit the task
listContainer.addEventListener("dblclick", function (e) {
    if (e.target.tagName === "LI") {
        editTask(e.target);
    }
});

//to save data in local storage
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showtask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showtask(); 

// To edit the list tasks 
function editTask(li) {
    const originalText = li.firstChild.textContent;
    const input = document.createElement("input");
    input.type = "text";
    input.value = originalText;
    li.innerHTML = "";
    li.appendChild(input);

    input.addEventListener("blur", function () {
        if (input.value !== "") {
            li.innerHTML = input.value;
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
        } else {
            li.remove();
        }
        saveData();
    });

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            input.blur();
        }
    });

    input.focus();
}

showtask();
