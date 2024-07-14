import React from "react";
import { Link } from "react-router-dom";

const NavigationalLink = (props) => {
  return (
    <Link
      onClick={props.onClick}
      className="navlink"
      to={props.to}
      style={{ background: props.bg, color: props.textColor }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationalLink;
