import React, { useContext, useState, useEffect } from "react";
import { TaskListContext } from "../../Context/TaskListContext";
import { AuthContext } from "../../Context/AuthContext";
import { Redirect } from "react-router-dom";
import { logout } from "../../actions/AuthActions";
import "../../styles.css";

function MyTasks() {
  const { userData, dispatch } = useContext(AuthContext);
  return (
    <>
      {userData.token === null && <Redirect to="/" />}
      <Navbar dispatch={dispatch} />
      <MyForm />
      <List />
    </>
  );
}

export default MyTasks;

function List() {
  const { tasks } = useContext(TaskListContext);
  return (
    <div className="container mt-5 ">
      <h4 className="text-center">Your Todos</h4>
      {tasks.length ? (
        <ul className="list-group">
          {tasks.map((task) => (
            <Task task={task} key={task.id} />
          ))}
        </ul>
      ) : (
        <div>No Tasks for you Today.</div>
      )}
    </div>
  );
}

function Task({ task }) {
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
    <li className="list-group-item d-flex row">
      <div className="col-sm-9" style={{ ...styleOnDone, ...styleOnBlocked }}>
        {task.title}
      </div>
      <div className="col-sm-3 px-0 d-flex justify-content-end">
        <MyButton
          task={task}
          doneButtonTitle={doneButtonTitle}
          disableDoneButton={disableDoneButton}
          disableBlockButton={disableBlockButton}
          blockButtonTitle={blockButtonTitle}
        />
      </div>
    </li>
  );
}

function MyButton({
  task,
  doneButtonTitle,
  disableDoneButton,
  disableBlockButton,
  blockButtonTitle,
}) {
  const { removeTask, findItem, toggleHandler } = useContext(TaskListContext);

  return (
    <>
      <button
        className="mr-3 task-btn text-primary"
        title={doneButtonTitle}
        disabled={disableDoneButton}
        onClick={() => toggleHandler(task.id, "done")}
      >
        {task.done ? (
          <i className="fas fa-check-circle"></i>
        ) : (
          <i className="far fa-check-circle"></i>
        )}
      </button>
      <button
        className="task-btn mr-3 text-primary"
        disabled={disableBlockButton}
        onClick={() => toggleHandler(task.id, "blocked")}
        title={blockButtonTitle}
      >
        <i className="fa fa-ban" aria-hidden="true"></i>
      </button>
      <button
        onClick={() => removeTask(task.id)}
        className="task-btn mr-3 text-primary"
        title="Delete"
      >
        <i className="fas fa-trash-alt" />
      </button>
      <button
        onClick={() => findItem(task.id)}
        className="task-btn mr-3 text-primary"
        title="Edit"
      >
        <i className="fas fa-pen" />
      </button>
    </>
  );
}

function Navbar({ dispatch }) {
  const handleLogout = () => {
    dispatch(logout());
    return <Redirect to="/" />;
  };
  return (
    <>
      <nav className="navbar bg-primary text-white ">
        <h2 className="navbar-text ">Your Tasks</h2>
        <ul className="navbar-nav d-flex justify-content-end align-items-baseline">
          <li className="nav-item">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

function MyForm() {
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
    <div className="container pt-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            id="task-input"
            onChange={handleChange}
            value={title}
            type="search"
            className="form-control"
            placeholder="Add Task..."
            required
          />
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary mr-2">
            {editItem ? "Edit Task" : "Add Task"}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => {
              if (window.confirm("Are you sure you wish to clear the list?"))
                handleClear(e);
            }}
          >
            Clear List
          </button>
        </div>
      </form>
    </div>
  );
}
