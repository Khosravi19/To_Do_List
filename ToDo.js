window.addEventListener("load", showTasks);

let add_button = document.querySelector("button");
let input = document.querySelector("input");
let Tasklist = document.querySelector("ul");

let tasks;
if (!localStorage.getItem("todo")) {
  tasks = [];
} else {
  tasks = getTasks();
}

add_button.addEventListener("click", function () {
  if (!input.value == "") {
    let text = input.value;
    let Task = createTask(text);
    Task.innerHTML += `<span class="close"><i class="fa-solid fa-trash-can"></i></span>`;
    Tasklist.appendChild(Task);
    saveTasks(text);
    input.value = "";
  }
});

Tasklist.addEventListener("click", function (event) {
  if (event.target.nodeName === "I") {
    let Target = event.target.parentElement.parentElement;
    Target.style = "display:none";
    tasks.splice(tasks.indexOf(Target.textContent), 1);
    localStorage.setItem("todo", tasks);
  }
});

function createTask(text) {
  let li = document.createElement("li");
  li.textContent = text;
  if (li.textContent !== "") {
    return li;
  }
}

function saveTasks(text) {
  tasks.push(text);
  localStorage.setItem("todo", tasks);
}

function getTasks() {
  return localStorage.getItem("todo").split(",");
}

function showTasks() {
  for (let taskText of getTasks()) {
    let task = createTask(taskText);
    task.innerHTML += `<span class="close"><i class="fa-solid fa-trash-can"></i></span>`;
    Tasklist.appendChild(task);
  }
}
