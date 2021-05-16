import React from "react";
import "./Header.css";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AppsIcon from "@material-ui/icons/Apps";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsIcon from "@material-ui/icons/Settings";
import { Avatar, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectedUser } from "../../features/userSlice";
import { auth } from "../../api/firebase";

function Header() {
  const user = useSelector(selectedUser);
  const dispatch = useDispatch();
  const signout = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div className="header">
      <div className="header__left">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <img
          src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png"
          alt="gmail-logo"
        />
      </div>
      <div className="header__middle">
        <SearchIcon />
        <input placeholder="Tìm kiếm trong thư" type="text" />
        <ArrowDropDownIcon />
      </div>
      <div className="header__right">
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <Avatar onClick={signout} src={user ? user.photourl : ""} className = 'avatar' />
      </div>
    </div>
  );
}

export default Header;
