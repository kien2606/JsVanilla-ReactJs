import { Checkbox, IconButton } from "@material-ui/core";
import React from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ReplayIcon from "@material-ui/icons/Replay";
function EmailList() {
  return (
    <div className="emaillist">
      <div className="emaillist__settings">
        <div className="emaillist__settingleft">
          <Checkbox />
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton>
            <ReplayIcon />
          </IconButton>
          <IconButton></IconButton>
        </div>
      </div>
    </div>
  );
}

export default EmailList;
