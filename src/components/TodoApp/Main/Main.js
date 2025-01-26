import React from "react";
import TaskList from "./TaskList/TaskList";
import Footer from "./Footer/Footer";
import PropTypes from "prop-types";

const Main = ({ actions, data }) => {
  return (
    <section className="main">
      <TaskList actions={actions} data={data} />
      <Footer actions={actions} data={data} />
    </section>
  );
};

Main.defaultProps = {
  actions: {},
  data: {
    tasks: [],
    unComplitedTasks: 0,
    viewMode: "all",
  },
};

Main.propTypes = {
  actions: PropTypes.shape({
    createTask: PropTypes.func,
    deleteTask: PropTypes.func,
    addTask: PropTypes.func,
    togleCecked: PropTypes.func,
    clearComplitedTasks: PropTypes.func,
    changingViewMode: PropTypes.func,
    changingTitle: PropTypes.func,
    viewUnComplitedTasksCount: PropTypes.func,
  }),
  data: PropTypes.shape({
    tasks: PropTypes.array,
    unComplitedTasks: PropTypes.number,
    viewMode: PropTypes.string,
  }),
};

export default Main;
