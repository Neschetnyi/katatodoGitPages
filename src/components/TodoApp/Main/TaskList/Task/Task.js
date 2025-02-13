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
    console.log("onChange", e.target.id);
    this.props.togleCecked(e.target.id);
    this.props.viewUnComplitedTasksCount();
    this.props.toglePlayFalse(this.props.id);
    this.props.saveToLocalStorage();
  };

  onDelete = () => {
    this.props.setingDeletedTrue(this.props.id);
    this.props.deleteTask(this.props.id);
    this.props.viewUnComplitedTasksCount();
  };

  togleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.timeInSec !== this.props.timeInSec) {
      this.props.viewUnComplitedTasksCount();
    }
  }

  componentDidMount() {
    console.log(
      "componentDidMount time of Unmount: ",
      this.props.timeOfUnmount
    );
    if (this.props.play) {
      let time = Date.now();
      let addingTime =
        this.props.timeInSec -
        Math.trunc((time - this.props.timeOfUnmount) / 1000);
      this.props.changingTimeState(this.props.id, addingTime);
      this.props.toglePlayFalse(this.props.id);
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    if (!this.props.deleted) {
      this.props.setingTimeOfUnmount(this.props.id);
    }
  }

  render() {
    let editComponent = null;
    if (this.state.edit) {
      editComponent = (
        <EditComponent
          id={this.props.id}
          togleEdit={this.togleEdit}
          title={this.props.title}
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
    console.log("single task props", this.props);
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
            <div className="timersContainer">
              <TimeOnWork {...this.props} />
              <div className="created">
                <Timer
                  deleted={this.props.deleted}
                  creationDate={this.props.creationDate}
                />
              </div>
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

export default Task;
