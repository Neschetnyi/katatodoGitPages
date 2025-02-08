import React, { Component } from "react";
import PropTypes from "prop-types";

class NewTaskForm extends Component {
  state = {
    value: "",
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.actions.addTask(this.state.value);
    this.setState({
      value: "",
    });
    this.props.actions.viewUnComplitedTasksCount();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="Что сделать?"
          autoFocus
          value={this.state.value}
          onChange={this.onChange}
        />
        <input class="new-todo-form__timer" placeholder="Min" autofocus />
        <input class="new-todo-form__timer" placeholder="Sec" autofocus />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  actions: {
    addTask: () => {},
    viewUnComplitedTasksCount: () => {},
  },
};

NewTaskForm.propTypes = {
  actions: PropTypes.shape({
    addTask: PropTypes.func.isRequired,
    viewUnComplitedTasksCount: PropTypes.func.isRequired,
  }).isRequired,
};

export default NewTaskForm;
