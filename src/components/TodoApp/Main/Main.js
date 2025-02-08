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

export default Main;
