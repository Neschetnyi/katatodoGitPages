import React, { Component } from "react";
import TasksFilter from "./TasksFilter/TasksFilter";

class Footer extends Component {
  onClear = () => {
    this.props.actions.clearComplitedTasks();
    this.props.actions.viewUnComplitedTasksCount();
    this.props.actions.saveToLocalStorage();
  };

  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          {this.props.data.unComplitedTasks} items left
        </span>
        <TasksFilter actions={this.props.actions} />
        <button
          className="clear-completed"
          onClick={this.props.actions.clearComplitedTasks}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

export default Footer;
