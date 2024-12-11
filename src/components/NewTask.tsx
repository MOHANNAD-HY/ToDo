import { useContext, useRef, useState } from "react";

import classes from "./newtask.module.css";
import { TaskContext } from "../store/TaskContext";

export default function NewTask() {
  const formCon = useRef<HTMLFormElement>(null);
  const [valid, setVaild] = useState<boolean>(false);
  const taskCtX = useContext(TaskContext);

  function handleButtonActivation() {
    const task = formCon.current?.task.value;
    const duedate = formCon.current?.date.value;
    if (task && duedate) {
      setVaild(() => true);
    }
  }

  function handleAddTask() {
    const task = formCon.current?.task.value;
    const duedate = formCon.current?.date.value;
    taskCtX.addTask(task, duedate);
    formCon.current!.reset();
    setVaild(() => false);
  }

  return (
    <section className={classes.container}>
      <form className={classes.inputSection} ref={formCon}>
        <input
          id="task"
          name="task"
          type="text"
          placeholder="Add New Task"
          onChange={handleButtonActivation}
          required
        />
        <input
          name="date"
          type="date"
          placeholder="Enter Your Task DueDate"
          onChange={handleButtonActivation}
          required
        />
        <button onClick={handleAddTask} disabled={!valid}>
          + Add Task
        </button>
      </form>
      {/* make this one line */}
      {!valid && <p>Please Fill the Data Correcttly</p>}
      {valid && <p>Press the Button To Add The Task</p>}
    </section>
  );
}
