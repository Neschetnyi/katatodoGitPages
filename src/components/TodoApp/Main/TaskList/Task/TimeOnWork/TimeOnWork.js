import React, { Component } from "react";

class TimeOnWork extends Component {
  render() {
    return (
      <div class="description">
        <button class="icon icon-play"></button>
        <button class="icon icon-pause"></button>
        {this.props.min}:{this.props.sec}
      </div>
    );
  }
}

export default TimeOnWork;
