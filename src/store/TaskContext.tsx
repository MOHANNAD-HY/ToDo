import { createContext, FC, ReactNode, useState } from "react";

export interface Task {
  taskId: string;
  taskContent: string;
  status: "complete" | "todo" | "overdue";
  dueDate: string;
}

interface Ctx {
  tasks: Task[];
  addTask: (task: string, dueDate: string) => void;
  removeTask: (id: string) => void;
  completeTask: (id: string) => void;
  saveData: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext<Ctx>({
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
  completeTask: () => {},
  saveData: () => {},
});

const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

const TaskContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(storedTasks);

  function generateId() {
    return "id_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
  }

  function getTaskCompleteDate() {
    const currentDate = new Date();

    const day = currentDate.getDate(); // Day of the month (1-31)
    const month = currentDate.getMonth() + 1; // Month (0-11), add 1 to get 1-12
    const year = currentDate.getFullYear(); // Full year (e.g., 2024)
    const hours = currentDate.getHours(); // Hours (0-23)
    const minutes = currentDate.getMinutes(); // Minutes (0-59)

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  function addTask(task: string, dueDate: string) {
    setTasks((todos) => {
      return [
        {
          taskId: generateId(),
          taskContent: task,
          status: "todo",
          dueDate,
        },
        ...todos,
      ];
    });
  }

  function removeTask(id: string) {
    setTasks((todos) => {
      return [...todos.filter((task) => task.taskId !== id)];
    });
  }

  function completeTask(id: string) {
    setTasks((todos) =>
      todos.map((task) =>
        task.taskId === id
          ? { ...task, status: "complete", dueDate: getTaskCompleteDate() }
          : task,
      ),
    );
  }

  function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  const todoCtx: Ctx = {
    tasks: tasks,
    addTask,
    removeTask,
    completeTask,
    saveData,
  };

  return (
    <TaskContext.Provider value={todoCtx}>{children}</TaskContext.Provider>
  );
};

export default TaskContextProvider;
