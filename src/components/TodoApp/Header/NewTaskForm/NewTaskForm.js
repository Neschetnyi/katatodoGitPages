import React, { Component } from "react";
import PropTypes from "prop-types";
import "./NewTaskForm.css";

class NewTaskForm extends Component {
  state = {
    title: "",
    min: "",
    sec: "",
  };

  onChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.actions.addTask(
      this.state.title,
      this.state.min,
      this.state.sec
    );
    console.log("input value is:", this.state.title);
    this.setState({
      title: "",
    });
    this.props.actions.viewUnComplitedTasksCount();
  };

  render() {
    console.log("actions in NewTaskForm", this.props.actions);

    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="Что сделать?"
          autoFocus
          value={this.state.title}
          onChange={this.onChange}
        />
        <input class="new-todo-form__timer" placeholder="Min" />
        <input class="new-todo-form__timer" placeholder="Sec" />
      </form>
    );
  }
}

export default NewTaskForm;
