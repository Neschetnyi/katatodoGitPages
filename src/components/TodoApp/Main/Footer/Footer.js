import React from "react";
import TasksFilter from "./TasksFilter/TasksFilter";

const Footer = ({ actions, data }) => {
  console.log("unComplitedTasks", data);
  return (
    <footer className="footer">
      <span className="todo-count">{data.unComplitedTasks} items left</span>
      <TasksFilter actions={actions} />
      <button className="clear-completed" onClick={actions.clearComplitedTasks}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
