import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import "./SendMail.css";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "../../features/mailSlice";
import { db } from "../../api/firebase";
import firebase from "firebase";
function SendMail() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    db.collection("emails").add({
      to: data.to,
      subject: data.subject,
      message: data.message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch(closeSendMessage());
  };
  return (
    <div className="sendmail">
      <div className="sendmail__header">
        <h3>Soạn tin Mới</h3>
        <CloseIcon
          onClick={() => dispatch(closeSendMessage())}
          className="sendmail__close"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Gửi đến"
          type="email"
          {...register("to", { required: true })}
        />
        {errors.to?.type && (
          <p className="sendmail__error"> This field is required</p>
        )}
        <input
          placeholder="Tiêu đề"
          type="text"
          {...register("subject", { required: true })}
        />
        {errors.subject && (
          <p className="sendmail__error"> This field is required</p>
        )}

        <input
          placeholder="Tin nhắn ...."
          type="text"
          className="sendmail__message"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <p className="sendmail__error"> This field is required</p>
        )}

        <div className="sendmail__options">
          <Button
            className="sendmail__button"
            type="submit"
            color="primary"
            variant="contained"
          >
            Gửi
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMail;
