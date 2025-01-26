import React, { Component } from "react";
import EditComponent from "./EditComponent/EditComponent";
import Timer from "./Timer/Timer";
import PropTypes from "prop-types";

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
    console.log("togleEdit");
    this.setState({ edit: !this.state.edit });
  };

  render() {
    console.log("single task !!!!!!!", this.props);
    let editComponent = null;
    if (this.state.edit) {
      editComponent = (
        <EditComponent
          id={this.props.id}
          togleEdit={this.togleEdit}
          changingTitle={this.props.changingTitle}
        />
      );
    } else {
      editComponent = null;
    }

    let { checked } = this.props;
    let classNames = "";

    console.log("single task", this.props);
    console.log("single task checked", checked);

    if (checked) {
      classNames += "completed ";
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
            <span className="description">{this.props.title}</span>
            <span className="created">
              <Timer />
            </span>
          </label>
          <button className="icon icon-edit" onClick={this.togleEdit}></button>
          <button
            className="icon icon-destroy"
            onClick={this.onDelete}
          ></button>
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
