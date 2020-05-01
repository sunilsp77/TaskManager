import React, { useContext } from "react";
import Header from "./Header";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { AuthContext } from "../../Context/AuthContext";
import { Redirect } from "react-router-dom";
import { AUTH_LOGOUT } from "../../actions/actionTypes";

function TaskManager() {
  const { userData, dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch({
      type: AUTH_LOGOUT,
    });
    return <Redirect to="/" />;
  };
  return (
    <>
      {userData.token === null && <Redirect to="/" />}

      <div className="container1">
        <div className="app-wrapper">
          <button onClick={handleLogout} className="btn-primary">
            Logout
          </button>
          <Header />
          <div className="main">
            <TaskForm />
            <TaskList />
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskManager;
