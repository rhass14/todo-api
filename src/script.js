const url = "http://localhost:4730/todos/";
const prepList = document.getElementById("prep-list");
const prepFilter = document.querySelectorAll("#prep-filter-list input");

let tasks = [];

async function loadTasksFromApi() {
  const loadRequest = await fetch(url);
  const tasksFromApi = await loadRequest.json();
  tasks = tasksFromApi;
  console.log(tasksFromApi);
  renderTasks();
}

prepFilter.forEach((prepFilter) => {
  prepFilter.addEventListener("change", () => {
    renderTasks();
  });
});

function getSelectedFilter() {
  let selectedFilter = "null";

  prepFilter.forEach((input) => {
    if (input.checked) {
      selectedFilter = input.value;
    }
  });

  return selectedFilter;
}

function renderTasks() {
  prepList.innerHTML = "";

  const selectedFilter = getSelectedFilter();
  const filteredTasks = tasks.filter((tasks) => {
    if (selectedFilter === "all") {
      return true;
    } else if (selectedFilter === "done") {
      return tasks.done;
    } else {
      return !tasks.done;
    }
  });

  filteredTasks.forEach(function (task) {
    const listEl = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "task" + task.id;
    checkbox.checked = task.done;
    checkbox.taskId = task.id;

    const description = document.createElement("label");
    description.htmlFor = checkbox.id;
    description.innerText = task.description;

    listEl.appendChild(checkbox);
    listEl.appendChild(description);

    prepList.appendChild(listEl);
  });
}

const btnAdd = document.getElementById("btn-add");
btnAdd.addEventListener("click", addTask);

async function addTask() {
  const prepDescription = document.getElementById("description");
  const newTask = { description: prepDescription.value, done: false };

  const addTaskRequest = await fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newTask),
  });
  const addTaskResponse = await addTaskRequest.json();
  tasks.push(addTaskRequest);
}

prepList.addEventListener("change", updateTask);

function updateTask(event) {
  const id = event.target.taskId;

  const updatedTask = tasks.find(function (task) {
    return task.id === id;
  });

  updatedTask.done = event.target.checked;
  fetch(url + "/" + id, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(updatedTask),
  });
  console.log(updatedTask);
}
loadTasksFromApi();

const btnRem = document.getElementById("btn-remove");
btnRem.addEventListener("click", deleteDoneTasks);

async function deleteDoneTasks() {
  const indexes = [];
  for (let i = tasks.length - 1; i >= 0; i--) {
    if (tasks[i].done === true) {
      const taskId = tasks[i].id;
      fetch(url + "/" + taskId, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      });
      tasks.splice(i, 1);
    }
  }
  renderTasks();
}

//update css/design
