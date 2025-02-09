import React, { Component } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import PropTypes from "prop-types";

class TodoApp extends Component {
  newId = 0;

  actions = {
    createTask: (props) => {
      return {
        id: this.newId++,
        title: props.title,
        min: props.min,
        sec: props.sec,
        hour: props.hour,
        day: props.day,
        fullDate: this.actions.DateConversion({
          min: props.min,
          sec: props.sec,
          hour: props.hour,
          day: props.day,
        }),
        checked: false,
        creationDate: Date.now(),
      };
    },

    DateConversion: ({ sec, min, hour, day }) => {
      return new Date(0, 0, day, hour, min, sec, 0);
    },

    deleteTask: (id) => {
      this.setState(({ tasks }) => {
        let index = tasks.findIndex((el) => el.id === id);

        let before = tasks.slice(0, index);
        let after = tasks.slice(index + 1);
        let newArr = [...before, ...after];

        return {
          tasks: newArr,
        };
      }, this.actions.saveToLocalStorage);
    },

    addTask: (title) => {
      this.setState(({ tasks }) => {
        return { tasks: [...tasks, this.actions.createTask(title)] };
      }, this.actions.saveToLocalStorage);
    },

    togleCecked: (id) => {
      this.setState(({ tasks }) => {
        let tempArr = [...tasks];
        let Index = tasks.findIndex((el) => el.id === id);
        let before = tempArr.slice(0, Index);
        let after = tempArr.slice(Index + 1);
        let newTask = { ...tempArr[Index], checked: !tempArr[Index].checked };
        let newArr = [...before, newTask, ...after];
        return { tasks: newArr };
      }, this.actions.saveToLocalStorage);
    },

    changingTimeState: (id, time) => {
      this.setState(({ tasks }) => {
        let tempArr = [...tasks];
        let Index = tasks.findIndex((el) => el.id === id);
        let before = tempArr.slice(0, Index);
        let after = tempArr.slice(Index + 1);
        let newTask = { ...tempArr[Index], time };
        let newArr = [...before, newTask, ...after];

        return { tasks: newArr };
      }, this.actions.saveToLocalStorage);
    },

    clearComplitedTasks: () => {
      this.setState(({ tasks }) => {
        let newArr = tasks.filter((el) => el.checked === false);
        return { tasks: newArr };
      }, this.actions.saveToLocalStorage);
    },

    changingViewMode: (viewMode) => {
      this.setState({ viewMode });
    },

    changingTitle: (id, title) => {
      this.setState(({ tasks }) => {
        let tempArr = [...tasks];
        let Index = tasks.findIndex((el) => el.id === id);
        let before = tempArr.slice(0, Index);
        let after = tempArr.slice(Index + 1);
        let newTask = { ...tempArr[Index], title };
        let newArr = [...before, newTask, ...after];

        return { tasks: newArr };
      }, this.actions.saveToLocalStorage);
    },

    viewUnComplitedTasksCount: () => {
      this.setState(({ tasks }) => {
        let unComplitedTasks = tasks.filter((el) => !el.checked);
        return { unComplitedTasks: unComplitedTasks.length };
      });
    },

    // Сохраняем данные в localStorage
    saveToLocalStorage: () => {
      const { tasks, unComplitedTasks, viewMode } = this.state;
      localStorage.setItem(
        "todoAppState",
        JSON.stringify({ tasks, unComplitedTasks, viewMode })
      );
    },

    // Восстанавливаем состояние из localStorage
    loadFromLocalStorage: () => {
      const savedState = localStorage.getItem("todoAppState");
      if (savedState) {
        const { tasks, unComplitedTasks, viewMode } = JSON.parse(savedState);
        this.setState({ tasks, unComplitedTasks, viewMode });
        this.newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 0; // Восстанавливаем новый ID
      }
    },

    handleBeforeUnload: (event) => {
      // Устанавливаем текст предупреждения

      const message = "Вы закрываете список";

      // Для старых браузеров или специфических случаев необходимо вернуть message
      event.returnValue = message; // Это для старых браузеров
      return message; // Для современных браузеров (например, Chrome)
    },
  };

  state = {
    tasks: [],
    unComplitedTasks: 0,
    viewMode: "all",
    onClose: "no reaction",
  };

  componentDidMount() {
    // Восстанавливаем состояние из localStorage при монтировании компонента
    this.actions.loadFromLocalStorage();

    // Считаем количество невыполненных задач
    this.actions.viewUnComplitedTasksCount();

    window.addEventListener("beforeunload", this.actions.handleBeforeUnload);
  }

  render() {
    return (
      <section className="todoapp">
        <Header actions={this.actions} />
        <Main data={this.state} actions={this.actions} />
      </section>
    );
  }
}

export default TodoApp;
