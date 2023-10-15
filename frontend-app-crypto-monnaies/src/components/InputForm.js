import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";

const InputForm = (props) => {
  return (
    <div>
      <label>
        {props.label} :::
        <span className={props.valid && props.varia ? "valid" : "hide"}>
          <BsCheckCircle />
        </span>
        <span className={props.valid || !props.varia ? "hide" : "invalid"}>
          <AiOutlineCloseCircle />
        </span>
      </label>
      <input
        type={props.type}
        id={props.name}
        onChange={props.handleChange}
        required
        autoComplete="off"
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default InputForm;
