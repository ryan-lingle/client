import React from "react";

const Toggle = ({ onChange }) => {
  return(
    <label className="switch">
      <input type="checkbox" onChange={onChange} />
      <span className="toggle round"></span>
    </label>
  )
}

export default Toggle;
