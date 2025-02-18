import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

class Timer extends Component {
  state = {
    timeToNow: formatDistanceToNow(this.props.creationDate, {
      includeSeconds: true,
    }),
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        timeToNow: formatDistanceToNow(this.props.creationDate, {
          includeSeconds: true,
        }),
      });
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleted !== this.props.deleted) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return <span>{this.state.timeToNow}</span>;
  }
}

Timer.defaultProps = {
  includeSeconds: true,
};

Timer.propTypes = {
  includeSeconds: PropTypes.bool,
};

export default Timer;
