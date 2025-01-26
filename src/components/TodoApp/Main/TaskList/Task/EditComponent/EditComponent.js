import React, { Component } from "react";
import PropTypes from "prop-types";

class EditComponent extends Component {
  state = {
    title: "",
  };

  onChange = (e) => {
    this.setState({ title: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.changingTitle(this.props.id, this.state.title);
    this.props.togleEdit();
    this.props.saveToLocalStorage();
  };

  componentDidMount() {
    window.addEventListener("click", this.props.togleEdit, true);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.props.togleEdit, true);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          value={this.state.title}
          onChange={this.onChange}
          className="edit"
          autoFocus
        />
      </form>
    );
  }
}

EditComponent.defaultProps = {
  id: 0,
  title: "",
  changingTitle: () => {},
  togleEdit: () => {},
};

EditComponent.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  changingTitle: PropTypes.func,
  togleEdit: PropTypes.func,
};

export default EditComponent;
