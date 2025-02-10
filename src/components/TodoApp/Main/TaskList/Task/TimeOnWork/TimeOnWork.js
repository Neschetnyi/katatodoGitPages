import React, { Component } from "react";
import "./index.css";

class TimeOnWork extends Component {
  secondsConverter = (seconds = 0) => {
    let ResultSec = seconds;
    let dayF = (ResultSec - (ResultSec % 86400)) / 86400;
    let hourMinSec = ResultSec - dayF * 86400;
    let hourMinSecOst = hourMinSec % 3600;
    let hoursInSec = hourMinSec - hourMinSecOst;
    let hourF = hoursInSec / 3600;
    let minSec = hourMinSec - hoursInSec;
    let minSecOst = minSec % 60;
    let minInSec = minSec - minSecOst;
    let minF = minInSec / 60;
    let SecF = ResultSec - dayF * 86400 - hourF * 3600 - minF * 60;

    console.log("ResultSec:", ResultSec);
    console.log("");
    console.log("day:", dayF);
    console.log("");
    console.log("hour:", hourF);
    console.log("");
    console.log("min:", minF);
    console.log("");
    console.log("Sec:", SecF);
    return { dayF, hourF, minF, SecF, ResultSec };
  };

  onPlay = () => {
    if (this.props.timeInSec !== 0) {
      this.timer = setInterval(() => {
        let newTimeInSec = this.state.timeInSec - 1;
        this.props.changingTimeState(this.props.id, newTimeInSec);
      }, 1000);
    }
  };

  onStop = () => {
    clearInterval(this.timer);
  };

  componentDidMount() {
    let time = this.secondsConverter(this.props.timeInSec);
    this.setState({
      day: time.dayF,
      hour: time.hourF,
      min: time.minF,
      sec: time.SecF,
      timeInSec: time.ResultSec,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.timeInSec !== this.props.timeInSec) {
      console.log("lets Update");
      if (this.props.timeInSec === 0) {
        clearInterval(this.timer);
      }
      let time = this.secondsConverter(this.props.timeInSec);
      this.setState({
        day: time.dayF,
        hour: time.hourF,
        min: time.minF,
        sec: time.SecF,
        timeInSec: time.ResultSec,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  state = {
    day: "",
    hour: "",
    min: "",
    sec: "",
    timeInSec: "",
  };

  render() {
    console.log("Props in timerOnWork", this.props);
    console.log("State in timerOnWork", this.state);
    return (
      <div className="timerNumbers">
        <button class="icon icon-play" onClick={this.onPlay}></button>
        <button class="icon icon-pause" onClick={this.onStop}></button>
        <span class="timerNumbers"></span>
        {this.state.day}:{this.state.hour}:{this.state.min}:{this.state.sec}
      </div>
    );
  }
}

export default TimeOnWork;
/*
 

*/
