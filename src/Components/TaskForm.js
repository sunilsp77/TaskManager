import React, { useContext, useState, useEffect } from "react";

import { TaskListContext } from "../Context/TaskListContext";

const TaskForm = () => {
  const { addTask, clearList, editItem, editTask } = useContext(
    TaskListContext
  );

  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editItem) {
      addTask(title);
      setTitle("");
    } else {
      editTask(title, editItem.id);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    clearList();
  };

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
      document.getElementById("task-input").focus();
    } else {
      setTitle("");
    }
  }, [editItem]);

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        id="task-input"
        onChange={handleChange}
        value={title}
        type="search"
        className="task-input"
        placeholder="Add Task..."
        required
      />
      <div className="buttons">
        <button type="submit" className="btn add-task-btn">
          {editItem ? "Edit Task" : "Add Task"}
        </button>
        <button
          onClick={(e) => {
            if (window.confirm("Are you sure you wish to clear the list?"))
              handleClear(e);
          }}
          className="btn clear-btn"
        >
          Clear List
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
