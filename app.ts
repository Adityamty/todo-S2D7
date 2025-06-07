// Basic Types
let taskCount: number = 0;
let isCompleted: boolean = false;
let taskTitle: string = "My Tasks";
let nullTask: null = null;
let undefinedTask: undefined = undefined;
let anyData: any = "Flexible";

// Array and Tuple
let taskArray: string[] = [];
let taskTuple: [string, number] = ["First task", 1];

// Enum
enum TaskStatus {
  Pending = "PENDING",
  Done = "DONE",
}

// Literal and Union Types
type TaskPriority = "low" | "medium" | "high";
type TaskType = string | null;

// Interface
interface ITodo {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  description?: string; // Optional property
}

// Type Alias
type TodoAction = "add" | "delete";

// Intersection Type
type AdvancedTodo = ITodo & { deadline?: Date };

// Conditional Type
type Result<T> = T extends string ? string : number;

// Type Guard
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// Class using typecasting
class TodoList {
  private tasks: ITodo[] = [];

  constructor() {
    this.init();
  }

  addTask(title: TaskType, priority: TaskPriority = "medium"): void {
    if (!title || !isString(title)) return;

    const newTask: ITodo = {
      id: ++taskCount,
      title,
      status: TaskStatus.Pending,
      priority
    };

    this.tasks.push(newTask);
    this.renderTasks();
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.renderTasks();
  }

  renderTasks(): void {
    const list = document.getElementById("taskList") as HTMLUListElement;
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

  init(): void {
    const input = document.getElementById("taskInput") as HTMLInputElement;
    const btn = document.getElementById("addBtn") as HTMLButtonElement;

    btn.addEventListener("click", () => {
      this.addTask(input.value as string);
      input.value = "";
    });
  }
}

// Generics and Mapped Types
function wrapInArray<T>(item: T): T[] {
  return [item];
}

type OptionalTodo = Partial<ITodo>;         // Mapped Type
type ReadOnlyTodo = Readonly<ITodo>;        // Mapped Type

// Never type demo
function throwError(msg: string): never {
  throw new Error(msg);
}

// Using the class
const todoApp = new TodoList();
