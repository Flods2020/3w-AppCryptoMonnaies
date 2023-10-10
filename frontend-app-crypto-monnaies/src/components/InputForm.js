import React, { useEffect } from "react";

const InputForm = (props) => {
  useEffect(() => {
    console.log(props);
  });

  return (
    <div>
      <label>{props.label} ::: </label>
      <input
        onChange={props.handleChange}
        type={props.type}
        name={props.type}
      />
    </div>
  );
};

export default InputForm;
