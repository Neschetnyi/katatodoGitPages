import React from "react";
import NewTaskForm from "./NewTaskForm/NewTaskForm";
import PropTypes from "prop-types";

const Header = ({ actions }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm actions={actions} />
    </header>
  );
};

Header.defaultProps = {
  actions: {},
};

Header.propTypes = {
  actions: PropTypes.object.isRequired,
};

export default Header;
