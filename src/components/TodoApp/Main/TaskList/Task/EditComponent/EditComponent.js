import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const EditComponent = ({ id, title, changingTitle, togleEdit }) => {
  const [inputValue, setInputValue] = useState(title);

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    changingTitle(id, inputValue);
    togleEdit();
  };

  useEffect(() => {
    window.addEventListener("click", togleEdit, true);
    return () => {
      window.removeEventListener("click", togleEdit, true);
    };
  }, [togleEdit]);

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={onChange}
        className="edit"
        autoFocus
      />
    </form>
  );
};

EditComponent.defaultProps = {
  id: 0,
  title: "",
  changingTitle: () => {},
  togleEdit: () => {},
};

EditComponent.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  changingTitle: PropTypes.func,
  togleEdit: PropTypes.func,
};

export default EditComponent;
