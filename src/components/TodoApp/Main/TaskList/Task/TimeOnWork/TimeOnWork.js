import React, { Component } from "react";

class TimeOnWork extends Component {
  timer = null;

  onPlay = () => {
    console.log("onPlay TimeOnWork");
    console.log(" !this.props.play", !this.props.play);
    if (
      this.props.timeInSec !== 0 &&
      !this.props.checked &&
      !this.props.paused &&
      !this.props.play
    ) {
      console.log("lets play! TimeOnWork");
      console.log("this.timer", this.timer);
      this.timer = setInterval(() => {
        console.log("interval timer is set");

        this.props.timeDecrementation(this.props.id);
      }, 1000);

      console.log("this.timer", this.timer);
      this.props.toglePlayTrue(this.props.id);
    }
  };

  onStop = () => {
    console.log("onStop TimeOnWork");
    clearInterval(this.timer);
    this.timer = null;
    this.props.toglePlayFalse(this.props.id);
  };

  startTimer = () => {
    this.timer = setInterval(() => {
      console.log("interval timer is set");

      this.props.timeDecrementation(this.props.id);
    }, 1000);
  };

  componentDidMount() {
    console.log("componentDidMount id: ", this.props.id);

    console.log("componentDidMount TimeOnWork");
    if (this.props.play) {
      console.log("componentDidMount this.props.play set interval");
      console.log("componentDidMount this.props.play is", this.props.play);
      this.timer = setInterval(() => {
        console.log("interval timer is set");

        this.props.timeDecrementation(this.props.id);
      }, 1000);
      console.log("componentDidMount this.props.play is", this.props.play);
    }
    this.props.clearingTimeOfUnmount(this.props.id);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate TimeOnWork");
    if (
      prevProps.timeInSec !== this.props.timeInSec ||
      (prevProps.play !== this.props.play && !this.props.paused)
    ) {
      console.log("lets Update");
      if (this.props.timeInSec === 0) {
        console.log("lets Update this.props.timeInSec === 0 clear interval");
        clearInterval(this.timer);
        this.timer = null;
      }
      if (this.props.checked) {
        console.log("lets Update this.props.checked clear interval");
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount TimeOnWork");
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    let time = this.props.secondsConverter(this.props.timeInSec);
    console.log("Props in timerOnWork", this.props.id, this.props.play);

    return (
      <div className="description">
        <button class="icon icon-play" onClick={this.onPlay}></button>
        <button class="icon icon-pause" onClick={this.onStop}></button>
        <span class="timerNumbers">
          {time.dayF}:{time.hourF}:{time.minF}:{time.SecF}
        </span>
      </div>
    );
  }
}

export default TimeOnWork;
/*
 

*/
