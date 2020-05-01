import React, { useContext } from "react";
import { TaskListContext } from "../../Context/TaskListContext";

const Task = ({ task }) => {
  const { removeTask, findItem, toggleHandler } = useContext(TaskListContext);
  let styleOnBlocked = null,
    styleOnDone = null,
    disableDoneButton = false,
    disableBlockButton = false,
    blockButtonTitle = "Block",
    doneButtonTitle = "Done";

  if (task.blocked) {
    styleOnBlocked = { backgroundColor: "Orange", color: "black" };
    doneButtonTitle = "Cannot close blocked task";
    disableDoneButton = true;
    blockButtonTitle = "Unblock";
  }
  if (task.done) {
    styleOnDone = { textDecoration: "line-through" };
    doneButtonTitle = "Undone";
    disableBlockButton = true;
    blockButtonTitle = "Task already closed";
  }

  return (
    <li className="list-item">
      <span
        className="task-title"
        style={{ ...styleOnDone, ...styleOnBlocked }}
      >
        {task.title}
      </span>
      <div>
        <button
          className="btn-done task-btn"
          title={doneButtonTitle}
          disabled={disableDoneButton}
          onClick={() => toggleHandler(task.id, "done")}
        >
          <i className="fa fa-check" aria-hidden="true"></i>
        </button>
        <button
          className="btn-ban task-btn"
          disabled={disableBlockButton}
          onClick={() => toggleHandler(task.id, "blocked")}
          title={blockButtonTitle}
        >
          <i className="fa fa-ban" aria-hidden="true"></i>
        </button>
        <button
          onClick={() => removeTask(task.id)}
          className="btn-delete task-btn"
          title="Delete"
        >
          <i className="fas fa-trash-alt" />
        </button>
        <button
          onClick={() => findItem(task.id)}
          className="btn-edit task-btn"
          title="Edit"
        >
          <i className="fas fa-pen" />
        </button>
      </div>
    </li>
  );
};

export default Task;
