import React, { useContext } from "react";
import Header from "./Header";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { AuthContext } from "../../Context/AuthContext";
import { Redirect } from "react-router-dom";

function TaskManager() {
  const { userData } = useContext(AuthContext);
  return (
    <>
      {userData.token === null && <Redirect to="/" />}
      <div className="container1">
        <div className="app-wrapper">
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
