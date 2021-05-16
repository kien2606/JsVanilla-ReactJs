import React from "react";
import "./Mail.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
import ErrorIcon from "@material-ui/icons/Error";
import DeleteIcon from "@material-ui/icons/Delete";
import EmailIcon from "@material-ui/icons/Email";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import PrintIcon from "@material-ui/icons/Print";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectedMail, selectedOpenMail } from "../../features/mailSlice";
function Mail() {
  const history = useHistory();
  const selectedMailSingle = useSelector(selectedOpenMail);
  const dispatch = useDispatch();
  const returnEmailList = () => {
    dispatch(selectedMail(null));
    history.push("/");
  };
  return (
    <div className="mail">
      <div className="mail__tools">
        <div className="mail__toolleft">
          <IconButton onClick={returnEmailList}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton>
            <MoveToInboxIcon />
          </IconButton>
          <IconButton>
            <ErrorIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
          <IconButton>
            <EmailIcon />
          </IconButton>
          <IconButton>
            <WatchLaterIcon />
          </IconButton>
          <IconButton>
            <CheckCircleIcon />
          </IconButton>
          <IconButton>
            <LabelImportantIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="mail__toolright">
          <IconButton>
            <UnfoldMoreIcon />
          </IconButton>
          <IconButton>
            <PrintIcon />
          </IconButton>
          <IconButton>
            <ExitToAppIcon />
          </IconButton>
        </div>
      </div>
      <div className="mail__body">
        <div className="mail__bodyheader">
          <h2>{selectedMailSingle ? selectedMailSingle.subject : ""}</h2>
          <LabelImportantIcon className="mail__important" />
          <p>{selectedMailSingle ? selectedMailSingle.title : ""}</p>
          <p className="mail__time">
            {selectedMailSingle ? selectedMailSingle.time : ""}
          </p>
        </div>
        <div className="mail__message">
          <p>{selectedMailSingle ? selectedMailSingle.description : ""}</p>
        </div>
      </div>
    </div>
  );
}

export default Mail;
