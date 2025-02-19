import React, { useState, useEffect, useCallback, useRef } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [unComplitedTasks, setUnComplitedTasks] = useState(0);
  const [viewMode, setViewMode] = useState("all");
  const newId = useRef(0);

  const createTask = (props) => {
    let time = Date.now();
    let newTime = TimeToSecConversion({
      min: props.min,
      sec: props.sec,
      hour: props.hour,
      day: props.day,
    });
    return {
      id: newId.current++,
      title: props.title,
      min: props.min,
      sec: props.sec,
      hour: props.hour,
      day: props.day,
      timeInSec: newTime,
      checked: false,
      paused: false,
      play: false,
      timeOfUnmount: 0,
      additionalTime: 0,
      creationDate: time,
      deleted: false,
      currentTime: 0,
    };
  };

  const TimeToSecConversion = ({ day, hour, min, sec }) => {
    return (
      Number(sec) + Number(min) * 60 + Number(hour) * 3600 + Number(day) * 86400
    );
  };

  const secondsConverter = (seconds = 0) => {
    let dayF = Math.floor(seconds / 86400);
    let hourF = Math.floor((seconds % 86400) / 3600);
    let minF = Math.floor((seconds % 3600) / 60);
    let SecF = seconds % 60;
    return { dayF, hourF, minF, SecF, ResultSec: seconds };
  };

  const timeDecrementation = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, timeInSec: task.timeInSec - 1 } : task
      )
    );
    saveToLocalStorage();
  };

  const setTimeToNull = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, timeInSec: 0 } : task
      )
    );
    saveToLocalStorage();
  };

  const setCurrentTime = (id) => {
    const time = Date.now();
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, currentTime: time } : task
      )
    );
    saveToLocalStorage();
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const addTask = (title) => {
    setTasks((prevTasks) => [...prevTasks, createTask(title)]);
    saveToLocalStorage();
  };

  const togleCecked = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id
          ? { ...task, checked: !task.checked, deleted: !task.deleted }
          : task
      );

      setUnComplitedTasks(updatedTasks.filter((task) => !task.checked).length);
      return updatedTasks;
    });
    saveToLocalStorage();
  };

  const toglePlayTrue = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, play: true } : task))
    );
    saveToLocalStorage();
  };

  const toglePlayFalse = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, play: false } : task
      )
    );
    saveToLocalStorage();
  };

  const toglePausedTrue = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, paused: true } : task
      )
    );
    saveToLocalStorage();
  };

  const toglePausedFalse = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, paused: false } : task
      )
    );
    saveToLocalStorage();
  };

  const changingTimeState = (id, timeInSec) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, timeInSec } : task))
    );
    saveToLocalStorage();
  };

  const clearComplitedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.checked));
    saveToLocalStorage();
  };

  const clearingTimeOfUnmount = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, timeOfUnmount: 0 } : task
      )
    );
    saveToLocalStorage();
  };

  const setingDeletedTrue = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, deleted: true } : task
      )
    );
    saveToLocalStorage();
  };

  const setingTimeOfUnmount = (id) => {
    if (id) {
      const time = Date.now();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, timeOfUnmount: time } : task
        )
      );
      saveToLocalStorage();
    }
  };

  const changingViewMode = (viewMode) => {
    setViewMode(viewMode);
  };

  const changingTitle = (id, title) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, title } : task))
    );
    saveToLocalStorage();
  };

  const viewUnComplitedTasksCount = () => {
    setUnComplitedTasks(tasks.filter((task) => !task.checked).length);
    console.log(" after viewUnComplitedTasks", unComplitedTasks);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(
      "todoAppState",
      JSON.stringify({ tasks, unComplitedTasks, viewMode })
    );
  };

  const loadFromLocalStorage = () => {
    const savedState = localStorage.getItem("todoAppState");
    if (savedState) {
      const { tasks, unComplitedTasks, viewMode } = JSON.parse(savedState);
      setTasks(tasks);
      setUnComplitedTasks(unComplitedTasks);
      setViewMode(viewMode);
      newId.current = tasks.length ? tasks[tasks.length - 1].id + 1 : 0;
    }
    localStorage.clear();
  };

  const handleBeforeUnload = (event) => {
    const message = "Вы закрываете список";
    event.returnValue = message;
    return message;
  };

  const actions = {
    createTask,
    TimeToSecConversion,
    secondsConverter,
    timeDecrementation,
    setTimeToNull,
    setCurrentTime,
    deleteTask,
    addTask,
    togleCecked,
    toglePlayTrue,
    toglePlayFalse,
    toglePausedTrue,
    toglePausedFalse,
    changingTimeState,
    clearComplitedTasks,
    clearingTimeOfUnmount,
    setingDeletedTrue,
    setingTimeOfUnmount,
    changingViewMode,
    changingTitle,
    viewUnComplitedTasksCount,
    saveToLocalStorage,
    loadFromLocalStorage,
    handleBeforeUnload,
  };

  useEffect(() => {
    if (!tasks.length) {
      loadFromLocalStorage();
    }

    setUnComplitedTasks(tasks.filter((task) => !task.checked).length);

    localStorage.setItem(
      "todoAppState",
      JSON.stringify({ tasks, unComplitedTasks, viewMode })
    );

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [tasks, unComplitedTasks, viewMode]);

  return (
    <section className="todoapp">
      <Header actions={actions} />
      <Main data={{ tasks, unComplitedTasks, viewMode }} actions={actions} />
    </section>
  );
};

export default TodoApp;
