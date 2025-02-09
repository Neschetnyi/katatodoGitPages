import React, { Component } from "react";

class TimeOnWork extends Component {
  state = {
    day: this.props.day,
    hour: this.props.hour,
    min: this.props.min,
    sec: this.props.sec,
  };

  componentDidMount() {
    /* this.timer = setInterval(() => {
      this.props.changeTimeState(this.props.id, {
        day: this.props.day,
        hour: this.props.hour,
        min: this.props.min,
        sec: this.props.sec,
      });
    }, 1000);*/
  }

  render() {
    console.log("Props in timerOnWork", this.props);
    return (
      <div class="description">
        <button class="icon icon-play"></button>
        <button class="icon icon-pause"></button>
      </div>
    );
  }
}

export default TimeOnWork;
/*
 {this.props.fullDate.getDate()}:{this.props.fullDate.getHours()}:
        {this.props.fullDate.getMinutes()}:{this.props.fullDate.getSeconds()}

*/
