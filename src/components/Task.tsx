import { FC, useContext } from "react";
import classes from "./task.module.css";

import { TaskContext, Task as Tasktype } from "../store/TaskContext";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { Icon } from "@mui/material";

const Task: FC<{ task: Tasktype }> = ({ task }) => {
  const tasksCtx = useContext(TaskContext);

  return (
    <li
      className={`${classes.task} ${
        task.status === "complete" ? classes.complete : undefined
      }`}
    >
      <div className={classes.taskContent}>
        <p>{task.taskContent}</p>
        <p>
          {task.status === "complete" ? "Complete Time" : "Due Date"}
          {`: ${task.dueDate}`}
        </p>
      </div>

      <div className={classes.actions}>
        <button className={classes.deleteButton}>
          <Icon
            component={DeleteForeverOutlinedIcon}
            onClick={() => {
              tasksCtx.removeTask(task.taskId);
            }}
          />
        </button>
        {task.status !== "complete" && (
          <button className={classes.completeButton}>
            <Icon
              component={CheckIcon}
              onClick={() => {
                tasksCtx.completeTask(task.taskId);
              }}
            />
          </button>
        )}
      </div>
    </li>
  );
};

export default Task;
