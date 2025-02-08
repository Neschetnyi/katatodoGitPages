import React, { Component } from "react";
import PropTypes from "prop-types";
import "./NewTaskForm.css";

class NewTaskForm extends Component {
  state = {
    title: "",
    min: "",
    sec: "",
    hour: "",
    day: "",
  };

  onChange = (e) => {
    if (
      e.target.value !== "" &&
      /^[+]?\d+$/.test(e.target.value) &&
      (e.target.name === "day" ||
        e.target.name === "hour" ||
        e.target.name === "min" ||
        e.target.name === "sec")
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
    } else {
      let tempOutput = {
        title: this.state.title,
        min: this.state.min,
        sec: this.state.sec,
        hour: this.state.hour,
        day: this.state.day,
      };

      if (tempOutput.sec === "") {
        tempOutput.min = 0;
      }
      if (tempOutput.min === "") {
        tempOutput.sec = 0;
      }
      if (tempOutput.hour === "") {
        tempOutput.hour = 0;
      }
      if (tempOutput.day === "") {
        tempOutput.day = 0;
      }
      console.log("time data exists", tempOutput);
      this.props.actions.addTask(tempOutput);
    }

    console.log("input value is:", this.state.title);
    this.setState({
      title: "",
      min: "",
      sec: "",
      hour: "",
      day: "", // Обнуляем и другие поля
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
          name="day"
          placeholder="Day"
          value={this.state.hour}
          onChange={this.onChange}
          onKeyDown={this.handleKeyPress} // Обработка нажатия клавиши
        />
        <input
          className="new-todo-form__timer"
          name="hour"
          placeholder="Hour"
          value={this.state.hour}
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
