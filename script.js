const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => createTaskElement(task.text, task.completed));
};

addTaskButton.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  createTaskElement(taskText, false);
  taskInput.value = '';
  saveTasks();
}

function createTaskElement(text, completed) {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  checkbox.addEventListener('click', () => {
    taskItem.classList.toggle('completed');
    saveTasks();
  });

  const taskName = document.createElement('span');
  taskName.textContent = text;
  if (completed) taskItem.classList.add('completed');

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', () => {
    taskList.removeChild(taskItem);
    saveTasks();
  });

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskName);
  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('.task-item').forEach(item => {
    const text = item.querySelector('span').textContent;
    const completed = item.classList.contains('completed');
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

