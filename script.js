let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        // Checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onclick = () => toggleTask(index);

        // Task text
        let span = document.createElement("span");
        span.textContent = task.text;
        span.className = "task-text";
        if (task.completed) span.classList.add("completed");

        // Buttons
        let actions = document.createElement("div");
        actions.className = "actions";

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTask(index);

        let delBtn = document.createElement("button");
        delBtn.textContent = "X";
        delBtn.onclick = () => deleteTask(index);

        actions.appendChild(editBtn);
        actions.appendChild(delBtn);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(actions);

        list.appendChild(li);
    });
}

function addTask() {
    let input = document.getElementById("taskInput");
    if (input.value === "") return;

    tasks.push({ text: input.value, completed: false });
    saveTasks();
    input.value = "";
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
}

function editTask(index) {
    let newTask = prompt("Edit task:", tasks[index].text);
    if (newTask !== null && newTask !== "") {
        tasks[index].text = newTask;
        saveTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

displayTasks();
