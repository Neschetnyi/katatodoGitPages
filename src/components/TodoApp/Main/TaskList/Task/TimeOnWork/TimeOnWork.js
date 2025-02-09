import React, { Component } from "react";

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

  componentDidMount() {
    let time = this.secondsConverter(this.props.timeInSec);
    this.setState({
      day: time.dayF,
      hour: time.hourF,
      min: time.minF,
      sec: time.SecF,
      timeInSec: time.ResultSec,
    });
    this.timer = setInterval(() => {
      let newTimeINSec = this.state.timeInSec - 1;
      this.props.changeTimeState(this.props.id, newTimeINSec);
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.timeInSec !== this.props.timeInSec) {
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
      <div class="description">
        <button class="icon icon-play"></button>
        <button class="icon icon-pause"></button>
        {this.state.day}:{this.state.hour}:{this.state.min}:{this.state.sec}
      </div>
    );
  }
}

export default TimeOnWork;
/*
 

*/
