import React, { useState, useEffect } from "react";
import EditComponent from "./EditComponent/EditComponent";
import Timer from "./Timer/Timer";
import PropTypes from "prop-types";
import TimeOnWork from "./TimeOnWork/TimeOnWork";
import "./Task.css";

const Task = ({
  id,
  title,
  checked,
  play,
  timeInSec,
  currentTime,
  timeOfUnmount,
  creationDate,
  deleted,
  togleCecked,
  viewUnComplitedTasksCount,
  toglePlayFalse,
  saveToLocalStorage,
  setingDeletedTrue,
  deleteTask,
  changingTimeState,
  setingTimeOfUnmount,
  changingTitle,
  secondsConverter,
  clearingTimeOfUnmount,
  toglePlayTrue,
  setCurrentTime,
  timeDecrementation,
}) => {
  const [edit, setEdit] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    console.log("componentDidMount in Task timeInSec:", timeInSec);
    console.log("componentDidMount in Task currentTime:", currentTime);
    console.log("componentDidMount in Task time of Unmount:", timeOfUnmount);

    if (play) {
      let newTime = Date.now();
      let adjustedTime = timeInSec;

      if (timeOfUnmount === 0) {
        adjustedTime -= Math.trunc((newTime - currentTime) / 1000);
      } else {
        adjustedTime -= Math.trunc((newTime - timeOfUnmount) / 1000);
      }

      changingTimeState(id, adjustedTime);
    }
  }, []);

  useEffect(() => {
    viewUnComplitedTasksCount();
  }, [timeInSec]);

  useEffect(() => {
    return () => {
      console.log("componentWillUnmount in Task");
      if (!checked && !isDeleted) {
        console.log("componentWillUnmount in Task !deleted");
        setingTimeOfUnmount(id);
      }
    };
  }, [checked, isDeleted]);

  const handleToggleChecked = (e) => {
    togleCecked(e.target.id);
    viewUnComplitedTasksCount();
    toglePlayFalse(id);
    saveToLocalStorage();
  };

  const handleDelete = () => {
    setIsDeleted(true);
    setingDeletedTrue(id);
    deleteTask(id);
    viewUnComplitedTasksCount();
  };

  return (
    <li className={edit ? "editing" : ""}>
      <div className="view">
        <input
          className="toggle"
          checked={checked}
          type="checkbox"
          onChange={handleToggleChecked}
        />
        <label>
          <div className={`description ${checked ? "completed" : ""}`}>
            {title}
          </div>
          <div className="timersContainer">
            <TimeOnWork
              id={id}
              timeInSec={timeInSec}
              play={play}
              secondsConverter={secondsConverter}
              clearingTimeOfUnmount={clearingTimeOfUnmount}
              toglePlayTrue={toglePlayTrue}
              setCurrentTime={setCurrentTime}
              timeDecrementation={timeDecrementation}
              toglePlayFalse={toglePlayFalse}
              /* toglePausedTrue,
  toglePausedFalse,*/
            />
            <div className="created">
              <Timer deleted={deleted} creationDate={creationDate} />
            </div>
          </div>
          <button
            className="icon icon-edit"
            onClick={() => setEdit(!edit)}
          ></button>
          <button className="icon icon-destroy" onClick={handleDelete}></button>
        </label>
      </div>
      {edit && (
        <EditComponent
          id={id}
          togleEdit={() => setEdit(!edit)}
          title={title}
          changingTitle={changingTitle}
          saveToLocalStorage={saveToLocalStorage}
        />
      )}
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  play: PropTypes.bool.isRequired,
  timeInSec: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  timeOfUnmount: PropTypes.number.isRequired,
  creationDate: PropTypes.number.isRequired,
  deleted: PropTypes.bool.isRequired,
  togleCecked: PropTypes.func.isRequired,
  viewUnComplitedTasksCount: PropTypes.func.isRequired,
  toglePlayFalse: PropTypes.func.isRequired,
  saveToLocalStorage: PropTypes.func.isRequired,
  setingDeletedTrue: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  changingTimeState: PropTypes.func.isRequired,
  setingTimeOfUnmount: PropTypes.func.isRequired,
  changingTitle: PropTypes.func.isRequired,
};

export default Task;
