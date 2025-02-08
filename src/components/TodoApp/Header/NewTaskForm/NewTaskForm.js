import React, { Component } from "react";
import PropTypes from "prop-types";
import "./NewTaskForm.css";

class NewTaskForm extends Component {
  state = {
    value: "",
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.actions.addTask(this.state.value);
    console.log("input value is:", this.state.value);
    this.setState({
      value: "",
    });
    this.props.actions.viewUnComplitedTasksCount();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="Что сделать???"
          autoFocus
          value={this.state.value}
          onChange={this.onChange}
        />
        <input class="new-todo-form__timer" placeholder="Мин" autofocus />
        <input class="new-todo-form__timer" placeholder="Сек" autofocus />
      </form>
    );
  }
}

export default NewTaskForm;
