let ID;
let inputTask = document.getElementById("input-task");
let listTask = document.getElementById("task-list");

let tasks = new Map();


function init(){
    tasks = new Map(JSON.parse(localStorage.getItem("tasks"))) || new Map();
    if (tasks.size > 0){
        refresh();
        ID = tasks.size;
    } else {
        ID = 0;
    }
}

init();


function refresh() {
    tasks = new Map(JSON.parse(localStorage.getItem("tasks"))) || new Map();
    let content = "";
    for (let task of tasks.values()) {
        content += task;
    }
    listTask.innerHTML = content;
};

const on = (element, event, elementClass, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(elementClass)) {
            handler(e);
        }
    });
};

const getNewLiTask = (task) => {

    return "<li id=\"task-" + ID + "\">\n" +
        "                    <input type=\"checkbox\" class=\"checkBox\">\n" +
        "                    <span class=\"task\">" + task + "</span>\n" +
        "                    <button class=\"delete-btn\" id=\"delete-" + ID + "\">X</button>\n" +
        "                </li>";
};

on(document, "click", ".delete-btn", e => {
    tasks.delete(e.target.parentNode.id);
    localStorage.setItem("tasks", JSON.stringify([...tasks]));
    refresh(tasks);
});

on(document, "click", "#add-task-button", e => {
    let newTask = inputTask.value;
    if (newTask !== "") {
        tasks.set("task-" + ID, getNewLiTask(newTask));
        inputTask.value = "";
        ID++;
        localStorage.setItem("tasks", JSON.stringify([...tasks]));
        refresh(tasks);
    }
});

on(document, "change", ".checkBox", e => {
    let taskElement = e.target.parentNode.getElementsByClassName("task").item(0);
    if (e.target.checked === true) {
        taskElement.style.setProperty("text-decoration", "line-through");
    } else {
        taskElement.style.setProperty("text-decoration", "none");
    }
});


