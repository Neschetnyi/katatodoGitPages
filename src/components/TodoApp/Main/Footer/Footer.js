import React from "react";
import TasksFilter from "./TasksFilter/TasksFilter";

const Footer = ({ data, actions }) => {
  const onClear = () => {
    console.log("onClear", data.tasks);
    actions.clearComplitedTasks();
    actions.viewUnComplitedTasksCount();
  };

  return (
    <footer className="footer">
      <span className="todo-count">{data.unComplitedTasks} items left</span>
      <TasksFilter actions={actions} />
      <button className="clear-completed" onClick={onClear}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
