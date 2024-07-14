import React from "react";
import { TextField } from "@mui/material";

const CustomisedInput = (props) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "white" } }}
      name={props.name}
      label={props.label}
      type={props.type}
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          fontSize: 20,
          color: "red",
        },
      }}
    />
  );
};

export default CustomisedInput;
