import React, { Component } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import PropTypes from "prop-types";

class TodoApp extends Component {
  newId = 0;

  actions = {
    createTask: (title) => {
      console.log("created", title);
      return { id: this.newId++, title, checked: false };
    },

    deleteTask: (id) => {
      console.log("deleted", id);
      this.setState(({ tasks }) => {
        let index = tasks.findIndex((el) => el.id === id);
        console.log(index);
        let before = tasks.slice(0, index);
        let after = tasks.slice(index + 1);
        let newArr = [...before, ...after];

        return {
          tasks: newArr,
        };
      });
    },

    addTask: (title) => {
      this.setState(({ tasks }) => {
        return { tasks: [...tasks, this.actions.createTask(title)] };
      });
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
      });
    },

    clearComplitedTasks: () => {
      this.setState(({ tasks }) => {
        let newArr = tasks.filter((el) => el.checked === false);
        return { tasks: newArr };
      });
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
        console.log("changingTitle id: ", id);
        console.log("changingTitle newArr: ", newArr);
        return { tasks: newArr };
      });
    },

    viewUnComplitedTasksCount: () => {
      this.setState(({ tasks }) => {
        let unComplitedTasks = tasks.filter((el) => !el.checked);
        return { unComplitedTasks: unComplitedTasks.length };
      });
    },

    // Сохраняем данные в localStorage перед закрытием страницы
    saveToLocalStorage: () => {
      console.log("save to storage");
      const { tasks, unComplitedTasks, viewMode } = this.state;
      localStorage.setItem(
        "todoAppState",
        JSON.stringify({ tasks, unComplitedTasks, viewMode })
      );
    },

    // Восстанавливаем состояние из localStorage при монтировании
    loadFromLocalStorage: () => {
      const savedState = localStorage.getItem("todoAppState");
      if (savedState) {
        const { tasks, unComplitedTasks, viewMode } = JSON.parse(savedState);
        this.setState({ tasks, unComplitedTasks, viewMode });
        this.newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 0; // Восстанавливаем новый ID
      }
    },
  };

  state = {
    tasks: [],
    unComplitedTasks: 0,
    viewMode: "all",
  };

  componentDidMount() {
    // Восстанавливаем состояние из localStorage при монтировании компонента
    this.actions.loadFromLocalStorage();
    console.log("after load storage");
    // Слушаем событие переключения вкладок
    window.addEventListener("storage", this.actions.loadFromLocalStorage);

    // Считаем количество невыполненных задач
    this.actions.viewUnComplitedTasksCount();
  }

  componentWillUnmount() {
    // Сохраняем состояние в localStorage перед закрытием вкладки/страницы
    this.actions.saveToLocalStorage();
    console.log("after load storage");
    // Убираем слушателя события переключения вкладок
    window.removeEventListener("storage", this.actions.loadFromLocalStorage);
    console.log("after saving storage");
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

TodoApp.defaultProps = {
  tasks: [],
  unComplitedTasks: 0,
  viewMode: "all",
};

TodoApp.propTypes = {
  tasks: PropTypes.array,
  unComplitedTasks: PropTypes.number,
  viewMode: PropTypes.string,
};

export default TodoApp;
