import React, { useContext } from "react";
import { TaskListContext } from "../Context/TaskListContext";

const Task = ({ task }) => {
  const { removeTask, findItem, toggleBlock } = useContext(TaskListContext);
  const styleBlocked = task.blocked
    ? { backgroundColor: "Orange", color: "black" }
    : null;
  return (
    <li className="list-item">
      <span className="task-title" style={styleBlocked}>
        {task.title}
      </span>
      <div>
        <button
          className="btn-ban task-btn"
          onClick={() => toggleBlock(task.id)}
        >
          <i className="fa fa-ban" aria-hidden="true"></i>
        </button>
        <button
          onClick={() => removeTask(task.id)}
          className="btn-delete task-btn"
        >
          <i className="fas fa-trash-alt" />
        </button>
        <button onClick={() => findItem(task.id)} className="btn-edit task-btn">
          <i className="fas fa-pen" />
        </button>
      </div>
    </li>
  );
};

export default Task;
