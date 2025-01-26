import React from "react";
import Task from "./Task/Task";
import PropTypes from "prop-types";

const TaskList = ({ data, actions }) => {
  console.log("TaskList data:", data);

  let tasksNewArr = [];
  let renderingTasks = (taskList) => {
    for (let i = 0; i < taskList.length; i++) {
      tasksNewArr = taskList.map((task) => {
        let { id, ...prop } = task;
        return (
          <Task
            key={id}
            id={id}
            {...prop}
            deleteTask={() => actions.deleteTask(id)}
            togleCecked={() => actions.togleCecked(id)}
            viewUnComplitedTasksCount={() =>
              actions.viewUnComplitedTasksCount(id)
            }
            changingTitle={actions.changingTitle}
          />
        );
      });
    }
  };

  let switchArraysOnViewMode = () => {
    if (data.viewMode === "all") {
      return data.tasks;
    } else if (data.viewMode === "active") {
      return data.tasks.filter((task) => !task.checked);
    } else if (data.viewMode === "completed") {
      return data.tasks.filter((task) => task.checked);
    }
  };

  tasksNewArr = switchArraysOnViewMode();
  renderingTasks(tasksNewArr);
  console.log("TaskList tasksNewArr", tasksNewArr);
  return <ul className="todo-list">{tasksNewArr}</ul>;
};

TaskList.defaultProps = {
  data: {
    tasks: [],
    viewMode: "all",
  },
  actions: {
    deleteTask: () => {},
    togleCecked: () => {},
    viewUnComplitedTasksCount: () => {},
    changingTitle: () => {},
  },
};

TaskList.propTypes = {
  data: PropTypes.shape({
    tasks: PropTypes.array,
    viewMode: PropTypes.string,
  }),
  actions: PropTypes.shape({
    deleteTask: PropTypes.func,
    togleCecked: PropTypes.func,
    viewUnComplitedTasksCount: PropTypes.func,
    changingTitle: PropTypes.func,
  }),
};

export default TaskList;
