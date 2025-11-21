let taskDatabase = {};
let taskHistory = [];
let taskCount = 0;
let currentUser = '';
let enteredSecurityKey = '';

// Predefined task names and their security keys
const predefinedTasks = [
    { name: "Task1", key: "task1key" },
    { name: "Task2", key: "task2key" },
    { name: "SecurityCheck", key: "securekey" },
    { name: "UserLogin", key: "loginkey" },
    { name: "DataProcessing", key: "dataprocesskey" },
    { name: "SystemCleanup", key: "cleanupsyskey" },
    { name: "MemoryManagement", key: "memmgmtkey" },
    { name: "ErrorDetection", key: "errordetkey" },
    { name: "TaskScheduler", key: "schedtaskkey" },
    { name: "InterruptHandling", key: "intrphandlekey" },
    { name: "FileManagement", key: "filemanagekey" },
    { name: "Networking", key: "netkey" },
    { name: "IOTCommunication", key: "iotcommkey" },
    { name: "PriorityScheduling", key: "priorityschedkey" },
    { name: "RealTimeClockSync", key: "rtcSyncKey" }
];

function authenticateUser() {
    const username = document.getElementById("username").value.trim();
    if (username) {
        currentUser = username;
        document.getElementById("userAuth").style.display = "none";
        document.getElementById("taskForm").style.display = "block";
        alert(`${username} authenticated successfully!`);
    } else {
        alert('Please enter a username.');
    }
}

// Populate the task name dropdown with predefined task names
function populateTaskDropdown() {
    const taskSelect = document.getElementById("taskName");

    predefinedTasks.forEach(task => {
        const option = document.createElement("option");
        option.value = task.name;
        option.textContent = task.name;
        taskSelect.appendChild(option);
    });
}

// Ask the user for the security key
function askTaskName() {
    enteredSecurityKey = document.getElementById("taskKey").value.trim();

    if (enteredSecurityKey) {
        document.getElementById("taskForm").style.display = "none";
        document.getElementById("taskNameSection").style.display = "block";
        populateTaskDropdown();
    } else {
        alert("Please enter a security key.");
    }
}

function submitTask() {
    const taskName = document.getElementById("taskName").value.trim();
    const taskPriority = document.getElementById("taskPriority").value;

    if (taskCount >= 10) {
        document.getElementById("maxTaskWarning").innerText = "You can only enter up to 10 tasks.";
        return;
    }

    if (!taskName) {
        alert('Please select a task.');
        return;
    }

    const task = predefinedTasks.find(t => t.name === taskName);
    
    if (!task) {
        alert('Invalid task name.');
        return;
    }

    if (task.key === enteredSecurityKey) {
        taskDatabase[taskName] = {
            key: enteredSecurityKey,
            priority: taskPriority
        };
        addResult(taskName, "Task Created Successfully", "success", taskPriority);
        addToHistory(`Task "${taskName}" created by ${currentUser} with priority ${taskPriority}.`);
    } else {
        addResult(taskName, "Access Denied: Incorrect Security Key", "failure", taskPriority);
        addToHistory(`Access denied for task "${taskName}" by ${currentUser}.`);
    }

    document.getElementById("taskName").value = '';
    document.getElementById("taskKey").value = '';
    taskCount++;
}

function addResult(taskName, status, resultClass, priority) {
    const resultList = document.getElementById("resultList");
    const resultItem = document.createElement("li");

    resultItem.classList.add(resultClass, priority);
    resultItem.textContent = `${taskName} - ${status}`;
    resultList.appendChild(resultItem);
}

function addToHistory(message) {
    const historyList = document.getElementById("historyList");
    const historyItem = document.createElement("li");
    historyItem.textContent = message;
    historyList.appendChild(historyItem);
}
