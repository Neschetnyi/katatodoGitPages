import React, { useEffect, useState, useRef } from "react";

const TimeOnWork = ({
  id,
  timeInSec,
  play,
  paused,
  checked,
  setCurrentTime,
  timeDecrementation,
  toglePlayTrue,
  toglePlayFalse,
  clearingTimeOfUnmount,
  setTimeToNull,
  secondsConverter,
}) => {
  const timerRef = useRef(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentTime(id);
      timeDecrementation(id);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    if (play) {
      startTimer();
    }
    clearingTimeOfUnmount(id);
    return () => {
      stopTimer();
    };
  }, []);

  useEffect(() => {
    if (timeInSec < 0) {
      setTimeToNull(id);
    }
    if (timeInSec === 0 || checked) {
      stopTimer();
    }
  }, [timeInSec, checked]);

  const onPlay = () => {
    if (timeInSec !== 0 && !checked && !paused && !play) {
      startTimer();
      toglePlayTrue(id);
    }
  };

  const onStop = () => {
    stopTimer();
    toglePlayFalse(id);
  };

  let time = secondsConverter(timeInSec);

  return (
    <div className="description">
      <button className="icon icon-play" onClick={onPlay}></button>
      <button className="icon icon-pause" onClick={onStop}></button>
      <span className="timerNumbers">
        {time.dayF}:{time.hourF}:{time.minF}:{time.SecF}
      </span>
    </div>
  );
};

export default TimeOnWork;
