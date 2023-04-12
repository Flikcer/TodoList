// Define some constants
const folders = document.querySelector("#folders");
const taskContainer = document.querySelector("#task-container");

let activeFolder;

// Create a function to generate unique IDs
function generateID() {
  return Math.random().toString().split(".").join("");
}

// Define a class for folders
class Folder {
  constructor(title) {
    this.id = generateID();
    this.title = title;
    this.tasks = [];
  }

  // Add a method to render the folder
  render() {
    const folder = document.createElement("div");
    folder.classList.add("folder");
    if (this === activeFolder) {
      folder.classList.add("active");
    }
    folder.setAttribute("id", this.id);

    const title = document.createElement("p");
    title.textContent = this.title;
    folder.appendChild(title);

    const deleteButton = document.createElement("img");
    deleteButton.classList.add("delete");
    deleteButton.src = "./images/delete.svg";
    deleteButton.addEventListener("click", () => this.delete());
    folder.appendChild(deleteButton);

    folder.addEventListener("click", () => {
      activeFolder = this;
      this.renderTasks();
      Folder.renderFolders();
    });

    folders.appendChild(folder);
  }

  // Add a method to delete the folder
  delete() {
    const index = s.indexOf(this);
    if (index !== -1) {
      s.splice(index, 1);
      Folder.renderFolders();
    }
  }

  // Add a method to render the tasks for this folder
  renderTasks() {
    taskContainer.innerHTML = "";
    this.tasks.forEach((task) => task.render());
  }

  // Add a static method to render all folders
  static renderFolders() {
    folders.innerHTML = "";
    s.forEach((folder) => folder.render());
  }
}

// Define a class for tasks
class Task {
  constructor(name, date, priority) {
    this.id = generateID();
    this.name = name;
    this.date = date;
    this.priority = priority;
  }

  // Add a method to render the task
  render() {
    const task = document.createElement("div");
    task.classList.add("task");
    task.setAttribute("id", this.id);

    const checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";
    task.appendChild(checkbox);

    const taskName = document.createElement("p");
    taskName.textContent = this.name;
    task.appendChild(taskName);

    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");
    task.appendChild(taskInfo);

    const taskDate = document.createElement("p");
    taskDate.textContent = this.date;
    taskInfo.appendChild(taskDate);

    const taskPriority = document.createElement("div");
    taskPriority.classList.add("badge");
    taskPriority.textContent = this.priority;
    taskInfo.appendChild(taskPriority);

    const deleteButton = document.createElement("img");
    deleteButton.classList.add("delete");
    deleteButton.src = "./images/delete.svg";
    deleteButton.addEventListener("click", () => this.delete());
    taskInfo.appendChild(deleteButton);

    const editButton = document.createElement("img");
    editButton.classList.add("edit");
    editButton.src = "./images/edit.svg";
    editButton.addEventListener("click", () => this.edit());
    taskInfo.appendChild(editButton);

    taskContainer.appendChild(task);
  }

  // Add a method to delete the task
  delete() {
    const folder = s.find((folder) => folder.tasks.includes(this));
    if (folder) {
      folder.tasks = folder.tasks.filter((task) => task !== this);
      folder.renderTasks();
    }
  }

  // Add a method to edit the task
  edit() {
    const task = document.getElementById(this.id);
    const taskName = task.querySelector("p");
    const taskDate = task.querySelector(".task-info p");
    const taskPriority = task.querySelector(".task-info .badge");

    const nameInput = document.createElement("input");
    nameInput.value = taskName.textContent;
    taskName.replaceWith(nameInput);

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = this.date;
    taskDate.replaceWith(dateInput);

    const priorityInput = document.createElement("select");
    const priorities = ["Low", "Medium", "High"];
    priorities.forEach((priority) => {
      const option = document.createElement("option");
      option.value = priority;
      option.text = priority;
      priorityInput.appendChild(option);
    });
    priorityInput.value = this.priority;
    taskPriority.replaceWith(priorityInput);

    const saveButton = document.createElement("img");
    saveButton.classList.add("save");
    saveButton.src = "./images/save.svg";
    saveButton.addEventListener("click", () => {
      this.name = nameInput.value;
      this.date = dateInput.value;
      this.priority = priorityInput.value;

      taskName.textContent = this.name;
      taskDate.textContent = this.date;
      taskPriority.textContent = this.priority;

      nameInput.replaceWith(taskName);
      dateInput.replaceWith(taskDate);
      priorityInput.replaceWith(taskPriority);
    });
    task.querySelector(".task-info").appendChild(saveButton);
  }
}

// Create some example folders and tasks
const folder1 = new Folder("Work");
const folder2 = new Folder("Personal");

const task1 = new Task("Finish report", "2023-04-20", "High");
const task2 = new Task("Buy groceries", "2023-04-15", "Medium");
const task3 = new Task("Pay bills", "2023-04-18", "Low");

folder1.tasks.push(task1);
folder2.tasks.push(task2);
folder2.tasks.push(task3);

const s = [folder1, folder2];

// Render the folders and tasks
Folder.renderFolders();
