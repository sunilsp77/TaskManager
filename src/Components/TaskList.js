import React, { useContext } from "react";
import { TaskListContext } from "../Context/TaskListContext";
import Task from "./Task";

const TaskList = () => {
  const { tasks, loading } = useContext(TaskListContext);
  return (
    <div>
      {tasks.length ? (
        <ul className="list">
          {tasks.map((task) => (
            <Task task={task} key={task.id} />
          ))}
        </ul>
      ) : (
        <div className="no-tasks">No Tasks</div>
      )}
    </div>
  );
};

export default TaskList;
