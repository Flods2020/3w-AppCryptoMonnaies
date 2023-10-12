import React from "react";

const InputForm = (props) => {
  return (
    <div>
      <label>{props.label} ::: </label>
      <input
        onChange={props.handleChange}
        type={props.type}
        name={props.type}
        autoComplete="off"
      />
    </div>
  );
};

export default InputForm;
