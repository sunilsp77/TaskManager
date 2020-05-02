import React from "react";
import { Route, Switch } from "react-router-dom";
import "./styles.css";
import RegistrationForm from "./Components/Auth/RegistrationForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyTasks from "./Components/TaskManager/MyTasks";

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={RegistrationForm} />
        <Route path="/tasks" component={MyTasks} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}
