let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Функция для сохранения задач в LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Функция для отображения задач на странице
function renderTasks(filter = "all") {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Очищаем список перед рендерингом

    let filteredTasks = tasks;
    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === "uncompleted") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");

        // Создаем чекбокс для отметки выполнения задачи
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleTaskStatus(index);

        // Создаем текст задачи
        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.classList.add("completed");
        }

        // Создаем кнопку "Редактировать"
        const editButton = document.createElement("button");
        editButton.textContent = "Редактировать";
        editButton.onclick = () => editTask(index);

        // Создаем кнопку "Удалить"
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.className = "delete";
        deleteButton.onclick = () => deleteTask(index);

        // Добавляем элементы в список
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

// Функция для добавления новой задачи
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    tasks.push({ text: taskText, completed: false });
    saveTasks();
    taskInput.value = "";
    renderTasks();
}

// Функция для удаления задачи
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Функция для редактирования задачи
function editTask(index) {
    const newText = prompt("Введите новое название задачи:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

// Функция для изменения статуса задачи (выполнена/не выполнена)
function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Функция для фильтрации задач
function filterTasks(filter) {
    renderTasks(filter);
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
});
