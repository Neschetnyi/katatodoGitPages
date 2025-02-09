import React, { Component } from "react";

class TimeOnWork extends Component {
  state = {
    day: this.props.day,
    hour: this.props.hour,
    min: this.props.min,
    sec: this.props.sec,
  };

  render() {
    console.log("Props in timerOnWork", this.props);
    return (
      <div class="description">
        <button class="icon icon-play"></button>
        <button class="icon icon-pause"></button>
        {this.props.day}:{this.props.hour}:{this.props.min}:{this.props.sec}
      </div>
    );
  }
}

export default TimeOnWork;
