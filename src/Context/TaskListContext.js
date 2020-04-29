import React, { createContext, useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
import axios from "../../src/axios-instance";
import { toast } from "react-toastify";

export const TaskListContext = createContext();

const TaskListContextProvider = (props) => {
  // const initialState = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    // localStorage.setItem("tasks", JSON.stringify(tasks));
    axios
      .get("/tasks.json")
      .then((res) => {
        const fetchedTasks = [];

        for (let key in res.data) {
          fetchedTasks.push({
            ...res.data[key],
            id: key,
          });
        }
        setTasks(fetchedTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addTask = (title) => {
    setLoading(true);
    const newTask = { title, blocked: false, done: false };
    axios
      .post("./tasks.json", newTask)
      .then((response) => {
        newTask.id = response.data.name;
        setLoading(false);
        setTasks([...tasks, newTask]);
        toast.success("Task Added successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to add task in DB");
      });
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    axios
      .delete("./tasks/" + id + ".json")
      .then((response) => {
        toast.success("Task deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Task could not be deleted from DB");
      });
  };

  const toggleHandler = (id, key) => {
    const taskToToggle = tasks.find((task) => task.id === id);
    taskToToggle[key] = !taskToToggle[key];
    const newTasks = tasks.map((task) =>
      task.id === id ? taskToToggle : task
    );
    setTasks(newTasks);
    axios
      .put("./tasks/" + id + ".json", taskToToggle)
      .then()
      .catch((err) => console.log(err));
  };

  const clearList = () => {
    setTasks([]);
  };

  const findItem = (id) => {
    const item = tasks.find((task) => task.id === id);
    setEditItem(item);
  };

  const editTask = (title, id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { title, id, blocked: task.blocked } : task
    );

    setTasks(newTasks);
    setEditItem(null);
    axios
      .put("./tasks/" + id + "/title.json", `"${title}"`)
      .then((res) => toast.success("Task updated successfully"))
      .catch((err) => console.log(err));
  };

  return (
    <TaskListContext.Provider
      value={{
        loading,
        tasks,
        addTask,
        removeTask,
        clearList,
        findItem,
        editTask,
        editItem,
        toggleHandler,
      }}
    >
      {props.children}
    </TaskListContext.Provider>
  );
};

export default TaskListContextProvider;
