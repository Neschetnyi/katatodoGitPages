import React, { Component } from "react";
import EditComponent from "./EditComponent/EditComponent";
import Timer from "./Timer/Timer";
import PropTypes from "prop-types";
import TimeOnWork from "./TimeOnWork/TimeOnWork";
import "./Task.css";

class Task extends Component {
  state = {
    edit: false,
  };

  onChange = (e) => {
    this.props.togleCecked(e.target.id);
    this.props.viewUnComplitedTasksCount();
  };

  onDelete = (e) => {
    this.props.deleteTask(e.target.id);
    this.props.viewUnComplitedTasksCount();
  };

  togleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  render() {
    console.log(
      `creation date of ${this.props.title}:`,
      this.props.creationDate
    );

    let editComponent = null;
    if (this.state.edit) {
      editComponent = (
        <EditComponent
          id={this.props.id}
          togleEdit={this.togleEdit}
          changingTitle={this.props.changingTitle}
          saveToLocalStorage={this.props.saveToLocalStorage}
        />
      );
    } else {
      editComponent = null;
    }

    let { checked } = this.props;
    let classNames = "";
    let classNamesDescription = "description";

    if (checked) {
      classNamesDescription += " completed ";
    }

    if (this.state.edit) {
      classNames += "editing ";
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            checked={checked}
            type="checkbox"
            onChange={this.onChange}
          />
          <label>
            <div className={classNamesDescription}>{this.props.title} </div>
            <TimeOnWork />
            <div className="created">
              <Timer creationDate={this.props.creationDate} />
            </div>
            <button
              className="icon icon-edit"
              onClick={this.togleEdit}
            ></button>
            <button
              className="icon icon-destroy"
              onClick={this.onDelete}
            ></button>
          </label>
        </div>
        {editComponent}
      </li>
    );
  }
}

Task.defaultProps = {
  title: "Untitled Task",
  checked: false,
  id: 0,
  deleteTask: () => {},
  togleCecked: () => {},
  viewUnComplitedTasksCount: () => {},
  changingTitle: () => {},
};

Task.propTypes = {
  title: PropTypes.string,
  checked: PropTypes.bool,
  id: PropTypes.number,
  deleteTask: PropTypes.func,
  togleCecked: PropTypes.func,
  viewUnComplitedTasksCount: PropTypes.func,
  changingTitle: PropTypes.func,
};

export default Task;
