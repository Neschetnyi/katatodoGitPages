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
    if (
      e.target.value !== "" &&
      /^[+]?\d+$/.test(e.target.value) &&
      (e.target.name === "min" || e.target.name === "sec")
    ) {
      // Введенное значение является числом
      this.setState({
        [e.target.name]: e.target.value, // Позволяет обновлять любое поле
      });
    } else if (e.target.name === "title") {
      this.setState({
        [e.target.name]: e.target.value,
      });
    } else {
      alert("Введите число");
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.title === "") {
      alert("Введите задачу");
    }
    if (this.state.min === "" || this.state.sec === "") {
      console.log('if min & sec = ""', this.state.min, this.state.sec);

      this.setState({
        min: "0",
        sec: "0",
      });
    }

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
