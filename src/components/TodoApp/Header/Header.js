import React from "react";
import NewTaskForm from "./NewTaskForm/NewTaskForm";
import PropTypes from "prop-types";

const Header = ({ actions }) => {
  return (
    <header className="header">
      <h1>Список Дел</h1>
      <NewTaskForm actions={actions} />
    </header>
  );
};

export default Header;
