import React from "react";
import "./SearchOption.css";
function SearchOption({ Icon, color,title }) {
  return (
    <div
      className="option"
      style={{
        color: `${color}`,
      }}
    >
      <Icon />
      <h3>{title}</h3>
    </div>
  );
}

export default SearchOption;
