import React, { useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import "./styles.css";
import RegistrationForm from "./Components/Auth/RegistrationForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyTasks from "./Components/TaskManager/MyTasks";
import { AuthContext } from "./Context/AuthContext";
import { authCheckState } from "./actions/AuthActions";

export default function App() {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    authCheckState(dispatch);
  }, [dispatch]);
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
