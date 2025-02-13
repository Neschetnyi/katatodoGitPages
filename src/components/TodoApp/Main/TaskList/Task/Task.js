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

  componentDidMount() {
    console.log(
      "componentDidMount time of Unmount: ",
      this.props.additionalTime
    );
    if (this.props.play) {
      console.log("componentDidMount play: ", this.props.play);
      let time = Date.now();
      let addingTime =
        this.state.timeInSec -
        Math.trunc((time - this.props.timeOfUnmount) / 1000);
      console.log("type of addingTime:", typeof addingTime);

      function secondsConverter(seconds) {
        console.log("secondsConverter input", seconds);
        let ResultSec = seconds;
        console.log("secondsConverter ResultSec", ResultSec);
        let dayF = (ResultSec - (ResultSec % 86400)) / 86400;
        console.log("secondsConverter dayF", dayF);
        let hourMinSec = ResultSec - dayF * 86400;

        let hourMinSecOst = hourMinSec % 3600;
        let hoursInSec = hourMinSec - hourMinSecOst;
        let hourF = hoursInSec / 3600;
        console.log("secondsConverter hourF", hourF);
        let minSec = hourMinSec - hoursInSec;
        let minSecOst = minSec % 60;
        let minInSec = minSec - minSecOst;
        let minF = minInSec / 60;
        let SecF = ResultSec - dayF * 86400 - hourF * 3600 - minF * 60;
        console.log("secondsConverter", dayF, hourF, minF, SecF, ResultSec);
        return { dayF, hourF, minF, SecF, ResultSec };
      }
      let obj = secondsConverter(this.state.timeInSec);
      this.props.changingTimeState(this.props.id, obj);
      console.log("time", time);
      console.log("this.props.additionalTime", this.props.timeOfUnmount);
      console.log(
        "difference",
        this.state.timeInSec -
          Math.trunc((time - this.props.additionalTime) / 1000)
      );
      console.log("result:", addingTime);
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
