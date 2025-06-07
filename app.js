"use strict";
// Basic Types
let taskCount = 0;
let isCompleted = false;
let taskTitle = "My Tasks";
let nullTask = null;
let undefinedTask = undefined;
let anyData = "Flexible";
// Array and Tuple
let taskArray = [];
let taskTuple = ["First task", 1];
// Enum
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["Pending"] = "PENDING";
    TaskStatus["Done"] = "DONE";
})(TaskStatus || (TaskStatus = {}));
// Type Guard
function isString(value) {
    return typeof value === "string";
}
// Class using typecasting
class TodoList {
    constructor() {
        this.tasks = [];
        this.init();
    }
    addTask(title, priority = "medium") {
        if (!title || !isString(title))
            return;
        const newTask = {
            id: ++taskCount,
            title,
            status: TaskStatus.Pending,
            priority
        };
        this.tasks.push(newTask);
        this.renderTasks();
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.renderTasks();
    }
    renderTasks() {
        const list = document.getElementById("taskList");
        list.innerHTML = "";
        for (const task of this.tasks) {
            const li = document.createElement("li");
            li.textContent = `${task.title} [${task.priority}]`;
            const btn = document.createElement("button");
            btn.textContent = "Delete";
            btn.onclick = () => this.deleteTask(task.id);
            li.appendChild(btn);
            list.appendChild(li);
        }
    }
    init() {
        const input = document.getElementById("taskInput");
        const btn = document.getElementById("addBtn");
        btn.addEventListener("click", () => {
            this.addTask(input.value);
            input.value = "";
        });
    }
}
// Generics and Mapped Types
function wrapInArray(item) {
    return [item];
}
// Never type demo
function throwError(msg) {
    throw new Error(msg);
}
// Using the class
const todoApp = new TodoList();
