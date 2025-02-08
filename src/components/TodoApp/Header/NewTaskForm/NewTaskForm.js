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
      [e.target.name]: e.target.value, // Позволяет обновлять любое поле
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log("state in NewTaskForm", this.state);

    this.props.actions.addTask({
      title: this.state.title,
      min: this.state.min,
      sec: this.state.sec,
    });
    console.log("input value is:", this.state.title);
    this.setState({
      title: "",
      min: "",
      sec: "", // Обнуляем и другие поля
    });
    this.props.actions.viewUnComplitedTasksCount();
  };

  handleKeyPress = (e) => {
    console.log("key pressed", e.key);
    if (e.key === "Enter") {
      this.onSubmit(e);
    }
  };

  render() {
    console.log("actions in NewTaskForm", this.props.actions);

    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          name="title"
          className="new-todo"
          placeholder="Что сделать?"
          autoFocus
          value={this.state.title}
          onChange={this.onChange}
          onKeyDown={this.handleKeyPress} // Обработка нажатия клавиши
        />
        <input
          className="new-todo-form__timer"
          name="min"
          placeholder="Min"
          value={this.state.min}
          onChange={this.onChange}
          onKeyDown={this.handleKeyPress} // Обработка нажатия клавиши
        />
        <input
          className="new-todo-form__timer"
          name="sec"
          placeholder="Sec"
          value={this.state.sec}
          onChange={this.onChange}
          onKeyDown={this.handleKeyPress} // Обработка нажатия клавиши
        />
      </form>
    );
  }
}

export default NewTaskForm;
