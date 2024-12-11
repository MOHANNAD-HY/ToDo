import classes from "./taskslist.module.css";
import Task from "./Task.tsx";
import { useContext } from "react";
import { TaskContext } from "../store/TaskContext";

const TasksList = () => {
  const taskCtx = useContext(TaskContext);
  const todos = taskCtx.tasks.filter((task) => task.status === "todo");
  const completedTasks = taskCtx.tasks.filter(
    (task) => task.status === "complete",
  );
  taskCtx.saveData();
  return (
    <section className={classes.lists}>
      <ul className={classes.todolist}>
        {todos.map((task) => (
          <Task key={task.taskId} task={task} />
        ))}
      </ul>
      <ul className={classes.completedlist}>
        {completedTasks.map((task) => (
          <Task key={task.taskId} task={task} />
        ))}
      </ul>
    </section>
  );
};

export default TasksList;
