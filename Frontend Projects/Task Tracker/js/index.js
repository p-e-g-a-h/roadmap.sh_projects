const tasksBox = document.querySelector("#tasksBox");
const createBtn = document.querySelector("button");
const textInput = document.querySelector("#textInput");
const tasks = [];

const renderTasks = () => {
  if (!tasks.length) {
    tasksBox.textContent = "There is no task.";
    return;
  }

  tasksBox.textContent = "";

  const completedTasks = tasks.filter(({ completed }) => completed);
  const notCompletedTasks = tasks.filter(({ completed }) => !completed);
  const sortedTasks = [...notCompletedTasks, ...completedTasks];

  sortedTasks.forEach(({ text, completed, id }) => {
    const taskCheckBox = document.createElement("input");
    const taskP = document.createElement("p");
    const taskSpan = document.createElement("span");
    const taskDiv = document.createElement("div");

    taskCheckBox.type = "checkbox";
    taskCheckBox.checked = completed;
    taskP.textContent = text;
    taskP.style.textDecoration = completed ? "line-through" : "none";
    taskSpan.textContent = "\u00D7";

    taskDiv.appendChild(taskCheckBox);
    taskDiv.appendChild(taskP);
    taskDiv.appendChild(taskSpan);
    taskDiv.setAttribute("id", `${id}`);
    tasksBox.appendChild(taskDiv);
  });
};

createBtn.addEventListener("click", () => {
  tasks.push({ text: textInput.value, completed: false, id: Date.now() });
  textInput.value = "";
  renderTasks();
});

tasksBox.addEventListener("click", (e) => {
  const taskId = Number(e.target.parentElement.id);
  const index = tasks.findIndex((task) => task.id === taskId);

  if (e.target.type === "checkbox") {
    tasks[index].completed = e.target.checked;
    renderTasks();
  } else if (e.target.tagName.toLowerCase() === "span") {
    tasks.splice(index, 1);
    renderTasks();
  }
});
