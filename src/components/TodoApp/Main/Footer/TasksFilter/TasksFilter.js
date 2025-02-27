import React, { Component } from "react";

class TasksFilter extends Component {
  state = {
    buttons: [
      {
        id: 0,
        name: "all",
        active: true,
        className: "selected",
      },
      {
        id: 1,
        name: "active",
        active: false,
        className: "",
      },
      {
        id: 2,
        name: "completed",
        active: false,
        className: "",
      },
    ],
  };

  onClickSetActive = (e) => {
    let tempArr = this.state.buttons.map((button) => {
      button.active = false;
      return button;
    });

    tempArr[e.target.id].active = true;
    this.setState({ buttons: tempArr });
  };

  onClickSetClassName = (e) => {
    let tempArr = this.state.buttons.map((button) => {
      button.className = "";
      return button;
    });

    tempArr[e.target.id].className = "selected";
    this.setState({ buttons: tempArr });
  };

  onClick = (e) => {
    this.onClickSetActive(e);
    this.onClickSetClassName(e);
    this.props.actions.changingViewMode(this.state.buttons[e.target.id].name);
  };
  render() {
    return (
      <ul className="filters">
        <li>
          <button
            id={this.state.buttons[0].id}
            className={this.state.buttons[0].className}
            onClick={this.onClick}
          >
            All
          </button>
        </li>
        <li>
          <button
            id={this.state.buttons[1].id}
            className={this.state.buttons[1].className}
            onClick={this.onClick}
          >
            Active
          </button>
        </li>
        <li>
          <button
            id={this.state.buttons[2].id}
            className={this.state.buttons[2].className}
            onClick={this.onClick}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

export default TasksFilter;
