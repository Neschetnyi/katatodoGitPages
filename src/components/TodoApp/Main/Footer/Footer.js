import React, { Component } from "react";
import TasksFilter from "./TasksFilter/TasksFilter";

class Footer extends Component {
  onClear = () => {
    console.log("onClear", this.props.data.tasks);

    this.props.actions.clearComplitedTasks();
    this.props.actions.viewUnComplitedTasksCount();
  };

  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          {this.props.data.unComplitedTasks} items left
        </span>
        <TasksFilter actions={this.props.actions} />
        <button className="clear-completed" onClick={this.onClear}>
          Clear completed
        </button>
      </footer>
    );
  }
}

export default Footer;
