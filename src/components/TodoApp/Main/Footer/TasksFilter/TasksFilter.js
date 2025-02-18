import React, { useState } from "react";

const TasksFilter = ({ actions }) => {
  const [buttons, setButtons] = useState([
    { id: 0, name: "all", active: true, className: "selected" },
    { id: 1, name: "active", active: false, className: "" },
    { id: 2, name: "completed", active: false, className: "" },
  ]);

  const onClick = (e) => {
    const newButtons = buttons.map((button, index) => ({
      ...button,
      active: index === Number(e.target.id),
      className: index === Number(e.target.id) ? "selected" : "",
    }));

    setButtons(newButtons);
    actions.changingViewMode(newButtons[e.target.id].name);
  };

  return (
    <ul className="filters">
      {buttons.map((button) => (
        <li key={button.id}>
          <button id={button.id} className={button.className} onClick={onClick}>
            {button.name.charAt(0).toUpperCase() + button.name.slice(1)}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TasksFilter;
