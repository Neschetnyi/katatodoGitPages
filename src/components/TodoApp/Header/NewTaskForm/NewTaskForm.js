import React, { useState } from "react";
import PropTypes from "prop-types";
import "./NewTaskForm.css";

const NewTaskForm = ({ actions }) => {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (/^[+]?[0-9]*$/.test(value)) {
      switch (name) {
        case "day":
          setDay(value);
          break;
        case "hour":
          setHour(value);
          break;
        case "min":
          setMin(value);
          break;
        case "sec":
          setSec(value);
          break;
        default:
          break;
      }
    } else {
      alert("Введите число");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      alert("Введите задачу");
      return;
    }

    const tempOutput = {
      title,
      day: day || 0,
      hour: hour || 0,
      min: min || 0,
      sec: sec || 0,
    };

    actions.addTask(tempOutput);
    actions.viewUnComplitedTasksCount();

    // Очистка полей
    setTitle("");
    setDay("");
    setHour("");
    setMin("");
    setSec("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        name="title"
        className="new-todo"
        placeholder="Что сделать?"
        autoFocus
        value={title}
        onChange={onChange}
        onKeyDown={handleKeyPress}
      />
      <input
        className="new-todo-form__timer"
        name="day"
        placeholder="Day"
        value={day}
        onChange={onChange}
        onKeyDown={handleKeyPress}
      />
      <input
        className="new-todo-form__timer"
        name="hour"
        placeholder="Hour"
        value={hour}
        onChange={onChange}
        onKeyDown={handleKeyPress}
      />
      <input
        className="new-todo-form__timer"
        name="min"
        placeholder="Min"
        value={min}
        onChange={onChange}
        onKeyDown={handleKeyPress}
      />
      <input
        className="new-todo-form__timer"
        name="sec"
        placeholder="Sec"
        value={sec}
        onChange={onChange}
        onKeyDown={handleKeyPress}
      />
    </form>
  );
};

export default NewTaskForm;
