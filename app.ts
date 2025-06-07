let taskCount: number = 0;
let isCompleted: boolean = false;
let taskTitle: string = "My Tasks";
let nullTask: null = null;
let undefinedTask: undefined = undefined;
let anyData: any = "Flexible";


let taskArray: string[] = [];
let taskTuple: [string, number] = ["First task", 1];


enum TaskStatus {
  Pending = "PENDING",
  Done = "DONE",
}


type TaskPriority = "low" | "medium" | "high";
type TaskType = string | null;


interface ITodo {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  description?: string; 
}


type TodoAction = "add" | "delete";


type AdvancedTodo = ITodo & { deadline?: Date };


type Result<T> = T extends string ? string : number;


function isString(value: unknown): value is string {
  return typeof value === "string";
}


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


function wrapInArray<T>(item: T): T[] {
  return [item];
}

type OptionalTodo = Partial<ITodo>;         
type ReadOnlyTodo = Readonly<ITodo>;       


function throwError(msg: string): never {
  throw new Error(msg);
}


const todoApp = new TodoList();
