import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import TaskListContextProvider from "./Context/TaskListContext";
import AuthContextProvider from "./Context/AuthContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <AuthContextProvider>
    <TaskListContextProvider>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </TaskListContextProvider>
  </AuthContextProvider>,
  rootElement
);
