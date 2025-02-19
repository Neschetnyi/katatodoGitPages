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
  deleted = false;
  onChange = (e) => {
    console.log("onChange", e.target.id);
    this.props.togleCecked(e.target.id);
    this.props.viewUnComplitedTasksCount();
    this.props.toglePlayFalse(this.props.id);
    this.props.saveToLocalStorage();
  };

  onDelete = () => {
    console.log("this deleted on delete before", this.deleted);
    this.deleted = true;
    console.log("this deleted on delete after", this.deleted);
    this.props.setingDeletedTrue(this.props.id);
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
    console.log("componentDidMount in Task timeInSec:", this.props.timeInSec);
    console.log(
      "componentDidMount in Task currentTime:",
      this.props.currentTime
    );
    console.log(
      "componentDidMount in Task time of Unmount: ",
      this.props.timeOfUnmount
    );
    if (this.props.play && this.props.timeOfUnmount === 0) {
      console.log("componentDidMount in Task timeOfUnmount === 0 !!!!!!!");
      let newTime = Date.now();
      let subTime =
        this.props.timeInSec -
        Math.trunc((newTime - this.props.currentTime) / 1000);
      this.props.changingTimeState(this.props.id, subTime);
    }
    if (this.props.play && this.props.timeOfUnmount !== 0) {
      console.log(
        "componentDidMount in Task time of Unmount:",
        this.props.timeOfUnmount
      );
      let time = Date.now();
      let addingTime =
        this.props.timeInSec -
        Math.trunc((time - this.props.timeOfUnmount) / 1000);
      this.props.changingTimeState(this.props.id, addingTime);
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount in Task");
    if (!this.props.checked && !this.deleted) {
      console.log("this deleted", this.deleted);

      console.log("componentWillUnmount in Task !this.props.deleted");
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

/* <Timer
deleted={this.props.deleted}
creationDate={this.props.creationDate}
/>
*/
