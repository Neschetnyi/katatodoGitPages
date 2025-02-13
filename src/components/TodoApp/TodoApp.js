import React, { Component } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import PropTypes from "prop-types";

class TodoApp extends Component {
  newId = 0;

  actions = {
    createTask: (props) => {
      let time = Date.now();
      console.log("createTask", time, "type of :", typeof time);

      return {
        id: this.newId++,
        title: props.title,
        min: props.min,
        sec: props.sec,
        hour: props.hour,
        day: props.day,
        timeInSec: this.actions.TimeToSecConversion({
          min: props.min,
          sec: props.sec,
          hour: props.hour,
          day: props.day,
        }),
        checked: false,
        paused: false,
        play: false,
        timeOfUnmount: 0,
        additionalTime: 0,
        creationDate: time,
        deleted: false,
      };
    },

    TimeToSecConversion: ({ day, hour, min, sec }) => {
      let result =
        Number(sec) +
        Number(min) * 60 +
        Number(hour) * 3600 +
        Number(day) * 86400;
      console.log(
        "TimeToSecConversion",
        sec,
        min,
        hour,
        day,
        "result: ",
        result
      );
      return result;
    },

    secondsConverter: (seconds = 0) => {
      let ResultSec = seconds;
      let dayF = (ResultSec - (ResultSec % 86400)) / 86400;
      let hourMinSec = ResultSec - dayF * 86400;
      let hourMinSecOst = hourMinSec % 3600;
      let hoursInSec = hourMinSec - hourMinSecOst;
      let hourF = hoursInSec / 3600;
      let minSec = hourMinSec - hoursInSec;
      let minSecOst = minSec % 60;
      let minInSec = minSec - minSecOst;
      let minF = minInSec / 60;
      let SecF = ResultSec - dayF * 86400 - hourF * 3600 - minF * 60;

      return { dayF, hourF, minF, SecF, ResultSec };
    },

    timeDecrementation: (id) => {
      this.setState(({ tasks }) => {
        let tempArr = [...tasks];
        let Index = tasks.findIndex((el) => el.id === id);
        let before = tempArr.slice(0, Index);
        let after = tempArr.slice(Index + 1);
        let timeInSec = {
          ...tempArr[Index],
          timeInSec: this.state.tasks[Index].timeInSec - 1,
        };
        let newArr = [...before, timeInSec, ...after];
        return { tasks: newArr };
      }, this.actions.saveToLocalStorage);
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

    toglePlayTrue: (id) => {
      this.setState(({ tasks }) => {
        let tempArr = [...tasks];
        let Index = tasks.findIndex((el) => el.id === id);
        let before = tempArr.slice(0, Index);
        let after = tempArr.slice(Index + 1);
        let newTask = { ...tempArr[Index], play: true };
        let newArr = [...before, newTask, ...after];
        return { tasks: newArr };
      }, this.actions.saveToLocalStorage);
    },

    toglePlayFalse: (id) => {
      this.setState(({ tasks }) => {
        let tempArr = [...tasks];
        let Index = tasks.findIndex((el) => el.id === id);
        let before = tempArr.slice(0, Index);
        let after = tempArr.slice(Index + 1);
        let newTask = { ...tempArr[Index], play: false };
        let newArr = [...before, newTask, ...after];
        return { tasks: newArr };
      }, this.actions.saveToLocalStorage);
    },

    toglePausedTrue: (id) => {
      this.setState(({ tasks }) => {
        let tempArr = [...tasks];
        let Index = tasks.findIndex((el) => el.id === id);
        let before = tempArr.slice(0, Index);
        let after = tempArr.slice(Index + 1);
        let newTask = { ...tempArr[Index], paused: true };
        let newArr = [...before, newTask, ...after];
        return { tasks: newArr };
      }, this.actions.saveToLocalStorage);
    },

    toglePausedFalse: (id) => {
      this.setState(({ tasks }) => {
        let tempArr = [...tasks];
        let Index = tasks.findIndex((el) => el.id === id);
        let before = tempArr.slice(0, Index);
        let after = tempArr.slice(Index + 1);
        let newTask = { ...tempArr[Index], paused: false };
        let newArr = [...before, newTask, ...after];
        return { tasks: newArr };
      }, this.actions.saveToLocalStorage);
    },

    changingTimeState: (id, timeInSec) => {
      this.setState(({ tasks }) => {
        let tempArr = [...tasks];
        let Index = tasks.findIndex((el) => el.id === id);
        let before = tempArr.slice(0, Index);
        let after = tempArr.slice(Index + 1);
        let newTask = { ...tempArr[Index], timeInSec };
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

    clearingTimeOfUnmount: (id) => {
      this.setState(({ tasks }) => {
        let tempArr = [...tasks];
        let Index = tasks.findIndex((el) => el.id === id);
        let before = tempArr.slice(0, Index);
        let after = tempArr.slice(Index + 1);
        let newTask = { ...tempArr[Index], timeOfUnmount: 0 };
        let newArr = [...before, newTask, ...after];
        return { tasks: newArr };
      }, this.actions.saveToLocalStorage);
    },

    setingDeletedTrue: (id) => {
      this.setState(({ tasks }) => {
        let tempArr = [...tasks];
        let Index = tasks.findIndex((el) => el.id === id);
        let before = tempArr.slice(0, Index);
        let after = tempArr.slice(Index + 1);
        let newTask = { ...tempArr[Index], deleted: true };
        let newArr = [...before, newTask, ...after];
        return { tasks: newArr };
      }, this.actions.saveToLocalStorage);
    },

    setingTimeOfUnmount: (id) => {
      if (id) {
        console.log("when setting time of umount id: ", id);

        let time = Date.now();
        this.setState(({ tasks }) => {
          let tempArr = [...tasks];
          let Index = tasks.findIndex((el) => el.id === id);
          let before = tempArr.slice(0, Index);
          let after = tempArr.slice(Index + 1);
          let newTask = { ...tempArr[Index], timeOfUnmount: time };
          let newArr = [...before, newTask, ...after];
          return { tasks: newArr };
        }, this.actions.saveToLocalStorage);
      }
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
    // localStorage.clear();
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
