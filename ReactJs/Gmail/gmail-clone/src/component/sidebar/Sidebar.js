import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { Button, IconButton } from "@material-ui/core";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import InboxIcon from "@material-ui/icons/Inbox";
import StarIcon from "@material-ui/icons/Star";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import NearMeIcon from "@material-ui/icons/NearMe";
import NoteIcon from "@material-ui/icons/Note";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/Person";
import DuoIcon from "@material-ui/icons/Duo";
import PhoneIcon from "@material-ui/icons/Phone";
function Sidebar() {
  return (
    <div className="sidebar">
      <Button
        startIcon={<AddIcon fontSize="large" />}
        className="sidebar__compose"
      >
        Soạn Thư
      </Button>
      <SidebarOption
        title="Hộp thư đến"
        Icon={InboxIcon}
        number="54"
        selected={true}
      />
      <SidebarOption
        title="Có gắn dấu sao"
        Icon={StarIcon}
        number="2"
        selected={false}
      />
      <SidebarOption
        title="Đã tạm ẩn"
        Icon={AccessTimeIcon}
        number="2"
        selected={false}
      />
      <SidebarOption
        title="Quan trọng"
        Icon={LabelImportantIcon}
        number="2"
        selected={false}
      />
      <SidebarOption
        title="Đã gửi"
        Icon={NearMeIcon}
        number="2"
        selected={false}
      />
      <SidebarOption
        title="Bản nháp"
        Icon={NoteIcon}
        number="2"
        selected={false}
      />
      <SidebarOption
        title="Xem thêm"
        Icon={ExpandMoreIcon}
        number="2"
        selected={false}
      />
      <div className="sidebar__footer">
        <div className="sidebar__footericons">
          <IconButton>
            <PersonIcon />
          </IconButton>
          <IconButton>
            <DuoIcon />
          </IconButton>
          <IconButton>
            <PhoneIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
