function toggleSidebar(selector) {
    const sidebar = document.querySelector(selector);
    sidebar.classList.toggle('visible');
}


document.querySelector('.settings-icon').addEventListener('click', () => {
  toggleSidebar('.settings-sidebar');
});

document.querySelectorAll('.close-sidebar-btn').forEach(button => {
  button.addEventListener('click', (event) => {
    const sidebar = event.target.closest('.settings-sidebar');
    sidebar.classList.remove('visible');
  });
});

function toggleSidebar(selector) {
  const sidebar = document.querySelector(selector);
  sidebar.classList.toggle('visible');
}

document.addEventListener("DOMContentLoaded", function() {
  
  const imageButtons = document.querySelectorAll(".imagesbutton");

  
  imageButtons.forEach(button => {
      button.addEventListener("click", function() {
          const imageUrl = button.querySelector("img").src;
          document.body.style.backgroundImage = `url(${imageUrl})`;
      });
  });

  
  const uploadBtn = document.getElementById("upload");
  const uploadInput = document.getElementById("upload-background");

  
  uploadBtn.addEventListener("click", function() {
      
      uploadInput.click();
  });

  
  uploadInput.addEventListener("change", function() {
      
      const file = uploadInput.files[0];

      
      if (file) {
          
          const reader = new FileReader();

          
          reader.onload = function(e) {
              
              document.body.style.backgroundImage = `url(${e.target.result})`;
          };

          
          reader.readAsDataURL(file);
      }
  });
});
document.querySelectorAll('.soundbutton').forEach(button => {
  button.addEventListener('click', function() {
    const soundSrc = button.getAttribute('data-src');
    playSound(soundSrc);
  });
});
let currentAudio = null; 

function playSound(soundSrc) {
  if (currentAudio) {
    currentAudio.pause();  
    currentAudio.currentTime = 0;  
  }
  currentAudio = new Audio(soundSrc);
  currentAudio.play();
}

function playSound(soundSrc) {
  if (currentAudio) {
    currentAudio.pause();  
    currentAudio.currentTime = 0;  
  }
  currentAudio = new Audio(soundSrc);
  currentAudio.play();
}
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('new-task-button').addEventListener('click', addTask);

  
  const profileButton = document.querySelector('.user-profile-icon');
  const settingsButton = document.querySelector('.settings-icon');
  const profileSidebar = document.querySelector('.profile-sidebar');
  const settingsSidebar = document.querySelector('.settings-sidebar');
  const closeProfileButton = profileSidebar.querySelector('.close-sidebar-btn');
  const closeSettingsButton = settingsSidebar.querySelector('.close-sidebar-btn');

  profileButton.addEventListener('click', () => {
      profileSidebar.classList.toggle('open');
  });

  settingsButton.addEventListener('click', () => {
      settingsSidebar.classList.toggle('open');
  });

  closeProfileButton.addEventListener('click', () => {
      profileSidebar.classList.remove('open');
  });

  closeSettingsButton.addEventListener('click', () => {
      settingsSidebar.classList.remove('open');
  });
});

let tasks = [];

function addTask() {
  const taskInput = document.getElementById('new-task-input');
  const taskName = taskInput.value.trim();
  if (taskName === '') return;

  const task = {
      id: Date.now(),
      name: taskName,
      completed: false,
      subtasks: []
  };

  tasks.push(task);
  taskInput.value = '';
  renderTasks();
}

function addSubtask(taskId) {
  const subtaskInput = document.getElementById(`subtask-input-${taskId}`);
  const subtaskName = subtaskInput.value.trim();
  if (subtaskName === '') return;

  const task = tasks.find(t => t.id === taskId);
  task.subtasks.push({
      id: Date.now(),
      name: subtaskName,
      completed: false
  });

  subtaskInput.value = '';
  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter(t => t.id !== taskId);
  renderTasks();
}

function deleteSubtask(taskId, subtaskId) {
  const task = tasks.find(t => t.id === taskId);
  task.subtasks = task.subtasks.filter(st => st.id !== subtaskId);
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.classList.add('task-item');

      const taskHeader = document.createElement('div');
      taskHeader.classList.add('task-header');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
          task.completed = checkbox.checked;
          renderTasks();
      });

      const taskName = document.createElement('span');
      taskName.classList.add('task-name');
      taskName.textContent = task.name;
      if (task.completed) {
          taskName.style.textDecoration = 'line-through';
      }

      const taskActions = document.createElement('div');
      taskActions.classList.add('task-actions');

      const addSubtaskButton = document.createElement('button');
      addSubtaskButton.classList.add('add-subtask-button');
      addSubtaskButton.textContent = '+ Subtask';
      addSubtaskButton.addEventListener('click', () => {
          const subtaskInputContainer = document.getElementById(`subtask-input-container-${task.id}`);
          subtaskInputContainer.style.display = subtaskInputContainer.style.display === 'none' ? 'block' : 'none';
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteTask(task.id));

      taskActions.appendChild(addSubtaskButton);
      taskActions.appendChild(deleteButton);

      taskHeader.appendChild(checkbox);
      taskHeader.appendChild(taskName);
      taskHeader.appendChild(taskActions);

      taskItem.appendChild(taskHeader);

      const subtaskList = document.createElement('ul');
      subtaskList.classList.add('subtask-list');
      task.subtasks.forEach(subtask => {
          const subtaskItem = document.createElement('li');
          subtaskItem.classList.add('subtask-item');

          const subtaskCheckbox = document.createElement('input');
          subtaskCheckbox.type = 'checkbox';
          subtaskCheckbox.checked = subtask.completed;
          subtaskCheckbox.addEventListener('change', () => {
              subtask.completed = subtaskCheckbox.checked;
              renderTasks();
          });

          const subtaskName = document.createElement('span');
          subtaskName.classList.add('subtask-name');
          subtaskName.textContent = subtask.name;
          if (subtask.completed) {
              subtaskName.style.textDecoration = 'line-through';
          }

          const subtaskDeleteButton = document.createElement('button');
          subtaskDeleteButton.textContent = 'Delete';
          subtaskDeleteButton.addEventListener('click', () => deleteSubtask(task.id, subtask.id));

          subtaskItem.appendChild(subtaskCheckbox);
          subtaskItem.appendChild(subtaskName);
          subtaskItem.appendChild(subtaskDeleteButton);

          subtaskList.appendChild(subtaskItem);
      });

      const subtaskInputContainer = document.createElement('div');
      subtaskInputContainer.classList.add('subtask-input-container');
      subtaskInputContainer.id = `subtask-input-container-${task.id}`;
      subtaskInputContainer.style.display = 'none';

      const subtaskInput = document.createElement('input');
      subtaskInput.type = 'text';
      subtaskInput.id = `subtask-input-${task.id}`;
      subtaskInput.placeholder = 'Enter subtask';

      const subtaskAddButton = document.createElement('button');
      subtaskAddButton.textContent = 'Add';
      subtaskAddButton.addEventListener('click', () => addSubtask(task.id));

      subtaskInputContainer.appendChild(subtaskInput);
      subtaskInputContainer.appendChild(subtaskAddButton);

      taskItem.appendChild(subtaskList);
      taskItem.appendChild(subtaskInputContainer);

      taskList.appendChild(taskItem);
  });
}
let timer;
let isRunning = false;
let isFocusMode = false;
let isBreakMode = false;
let remainingTime;

const timerDisplay = document.getElementById('timer-display');
const startPauseButton = document.getElementById('start-pause-button');
const resetButton = document.getElementById('reset-button');
const focusButton = document.getElementById('focus-button');
const breakButton = document.getElementById('break-button');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const setTimerButton = document.getElementById('set-timer-button');

function updateDisplay(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer(duration) {
  remainingTime = duration;
  updateDisplay(remainingTime);
  timer = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay(remainingTime);
    } else {
      clearInterval(timer);
      isRunning = false;
      startPauseButton.textContent = 'Start';
    }
  }, 1000);
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startPauseButton.textContent = 'Start';
  } else {
    startTimer(remainingTime);
    isRunning = true;
    startPauseButton.textContent = 'Pause';
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  startPauseButton.textContent = 'Start';
  if (isFocusMode) {
    startFocusSession();
  } else if (isBreakMode) {
    startBreakSession();
  } else {
    updateDisplay(0);
  }
}

function setTimer() {
  const hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;
  remainingTime = hours * 3600 + minutes * 60 + seconds;
  updateDisplay(remainingTime);
}

function startFocusSession() {
  isFocusMode = true;
  isBreakMode = false;
  remainingTime = 25 * 60; 
  updateDisplay(remainingTime);
  toggleTimer();
}

function startBreakSession() {
  isFocusMode = false;
  isBreakMode = true;
  remainingTime = 5 * 60; 
  updateDisplay(remainingTime);
  toggleTimer();
}

startPauseButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
setTimerButton.addEventListener('click', setTimer);
focusButton.addEventListener('click', startFocusSession);
breakButton.addEventListener('click', startBreakSession);

updateDisplay(0);

