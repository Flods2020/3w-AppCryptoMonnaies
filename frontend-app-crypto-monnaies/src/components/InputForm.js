import React from "react";

const InputForm = (props) => {
  return (
    <div>
      <label>{props.label} ::: </label>
      <input
        type={props.type}
        onChange={props.handleChange}
        name={props.id}
        autoComplete="off"
        required
      />
    </div>
  );
};

export default InputForm;
