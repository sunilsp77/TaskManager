import React, { createContext, useState, useEffect, useContext } from "react";
// import { v4 as uuidv4 } from "uuid";
import axios from "../../src/axios-instance";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const TaskListContext = createContext();

const TaskListContextProvider = (props) => {
  // const initialState = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    // localStorage.setItem("tasks", JSON.stringify(tasks));
    if (userData.token)
      axios
        .get(`./${userData.userId}/tasks.json?auth=` + userData.token)
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
  }, [userData]);

  const addTask = (title) => {
    setLoading(true);
    const newTask = { title, blocked: false, done: false };
    axios
      .post(`./${userData.userId}/tasks.json?auth=` + userData.token, newTask)
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
      .delete(`./${userData.userId}/tasks/${id}.json?auth=${userData.token}`)
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
      .put(
        `./${userData.userId}/tasks/${id}.json?auth=${userData.token}`,
        taskToToggle
      )
      .then()
      .catch((err) => console.log(err));
  };

  const clearList = () => {
    setTasks([]);
    axios
      .delete(`./${userData.userId}/tasks.json?auth=${userData.token}`)
      .then((response) => {
        toast.success("Cleared list successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Could not clear the list from DB");
      });
  };

  const findItem = (id) => {
    const item = tasks.find((task) => task.id === id);
    setEditItem(item);
  };

  const editTask = (title, id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, title } : task
    );

    setTasks(newTasks);
    setEditItem(null);
    axios
      .put(
        `./${userData.userId}/tasks/${id}/title.json?auth=${userData.token}`,
        `"${title}"`
      )
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
