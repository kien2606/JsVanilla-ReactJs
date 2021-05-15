import { Checkbox, IconButton } from "@material-ui/core";
import React from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import RedoIcon from "@material-ui/icons/Redo";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import InboxIcon from "@material-ui/icons/Inbox";
import PeopleIcon from "@material-ui/icons/People";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import "./EmailList.css";
import Section from "./Section";
import EmailRow from "./EmailRow";
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
            <RedoIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="emaillist__settingright">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
          <IconButton>
            <KeyboardIcon />
          </IconButton>
        </div>
      </div>
      <div className="emaillist__sections">
        <Section Icon={InboxIcon} title="Chính" color="red" selected={true} />
        <Section
          Icon={PeopleIcon}
          title="Mạng xã hội"
          color="#1a73e8"
          selected={false}
        />
        <Section
          Icon={LocalOfferIcon}
          title="Quảng cáo"
          color="green"
          selected={false}
        />
      </div>
      <div className="emaillist__list">
        <EmailRow
          title="Twitch"
          subject="haha this is just a joke"
          description="this is a test"
          time="10pm"
        />
      </div>
    </div>
  );
}

export default EmailList;
