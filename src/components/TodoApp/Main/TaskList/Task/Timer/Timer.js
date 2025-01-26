import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

class Timer extends Component {
  state = {
    time: Date.now(),
    timeToNow: formatDistanceToNow(Date.now(), { includeSeconds: true }),
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        timeToNow: formatDistanceToNow(this.state.time, {
          includeSeconds: true,
        }),
      });
    }, 1000);
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
