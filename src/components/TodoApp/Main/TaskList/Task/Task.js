import React, { useState, useEffect } from "react";
import EditComponent from "./EditComponent/EditComponent";
import Timer from "./Timer/Timer";
import PropTypes from "prop-types";
import TimeOnWork from "./TimeOnWork/TimeOnWork";
import "./Task.css";

const Task = (props) => {
  const [edit, setEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const onChange = (e) => {
    console.log("onChange", e.target.id);
    props.togleCecked(e.target.id);
    props.viewUnComplitedTasksCount();
    props.toglePlayFalse(props.id);
    props.saveToLocalStorage();
  };

  const onDelete = () => {
    console.log("this deleted on delete before", deleted);
    setDeleted(true);
    console.log("this deleted on delete after", deleted);
    props.setingDeletedTrue(props.id);
    props.deleteTask(props.id);
    props.viewUnComplitedTasksCount();
  };

  const togleEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    console.log("componentDidMount in Task timeInSec:", props.timeInSec);
    console.log("componentDidMount in Task currentTime:", props.currentTime);
    console.log(
      "componentDidMount in Task time of Unmount:",
      props.timeOfUnmount
    );

    if (props.play && props.timeOfUnmount === 0) {
      console.log("componentDidMount in Task timeOfUnmount === 0 !!!!!!!");
      let newTime = Date.now();
      let subTime =
        props.timeInSec - Math.trunc((newTime - props.currentTime) / 1000);
      props.changingTimeState(props.id, subTime);
    }
    if (props.play && props.timeOfUnmount !== 0) {
      console.log(
        "componentDidMount in Task time of Unmount:",
        props.timeOfUnmount
      );
      let time = Date.now();
      let addingTime =
        props.timeInSec - Math.trunc((time - props.timeOfUnmount) / 1000);
      props.changingTimeState(props.id, addingTime);
    }
  }, []);

  useEffect(() => {
    props.viewUnComplitedTasksCount();
  }, [props.timeInSec]);

  useEffect(() => {
    return () => {
      console.log("componentWillUnmount in Task");
      if (!props.checked && !deleted) {
        console.log("componentWillUnmount in Task !props.deleted");
        props.setingTimeOfUnmount(props.id);
      }
    };
  }, [deleted]);

  let classNamesDescription = "description";
  if (props.checked) {
    classNamesDescription += " completed ";
  }

  return (
    <li className={edit ? "editing" : ""}>
      <div className="view">
        <input
          className="toggle"
          checked={props.checked}
          type="checkbox"
          onChange={onChange}
        />
        <label>
          <div className={classNamesDescription}>{props.title} </div>
          <div className="timersContainer">
            <TimeOnWork {...props} />
            <div className="created">
              <Timer
                deleted={props.deleted}
                creationDate={props.creationDate}
              />
            </div>
          </div>
          <button className="icon icon-edit" onClick={togleEdit}></button>
          <button className="icon icon-destroy" onClick={onDelete}></button>
        </label>
      </div>
      {edit && (
        <EditComponent
          id={props.id}
          togleEdit={togleEdit}
          title={props.title}
          changingTitle={props.changingTitle}
          saveToLocalStorage={props.saveToLocalStorage}
        />
      )}
    </li>
  );
};

export default Task;
