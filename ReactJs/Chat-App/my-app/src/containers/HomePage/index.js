import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessage,
  realTimeUser,
  updateMessage,
} from "../../app/reducers/user.slice";
import Layout from "../../components/layouts";
import "./style.css";

//user component

const User = (props) => {
  const { user, onClick } = props;
  return (
    <div className="displayName" onClick={() => onClick(user)}>
      <div className="displayPic">
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      <div className="wrap-userinfor">
        <span style={{ fontWeight: 500 }}>
          {user.firstName} {user.lastName}
        </span>
        <span
          className={user.isOnline ? "online-status" : "online-status off"}
        ></span>
      </div>
    </div>
  );
};

// home component
export default function Home() {
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [userUid, setUserUid] = useState(null);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let unsubcribe;

  useEffect(() => {
    unsubcribe = dispatch(realTimeUser(auth.uid))
      .then((respone) => respone)
      .catch((error) => error.messenge);
    //componentwillunmount
    return () => {
      //cleanup
      unsubcribe.then((f) => f()).catch((error) => error.messenge);
    };
  }, []);

  // when click to user who you wanna chat
  const initChat = (user) => {
    setChatStarted(true);
    setChatUser(`${user.firstName} ${user.lastName}`);
    setUserUid(user.uid);
    dispatch(getMessage({ uid_1: auth.uid, uid_2: user.uid }));
  };

  // actions send message
  const sendMessage = (e) => {
    const messageObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message,
    };
    if (message !== "") {
      dispatch(updateMessage(messageObj)).then(() => {
        setMessage("");
      });
    }
    dispatch(getMessage({ uid_1: auth.uid, uid_2: userUid }));
  };

  // render list user that had in the firebase
  const userRendering =
    user.users.length > 0
      ? user.users.map((user, index) => {
          return <User user={user} key={index} onClick={initChat} />;
        })
      : null;

  return (
    <Layout>
      <section className="wrapper">
        <div className="listOfUsers">{userRendering}</div>
        <div className="chatArea">
          <div className="chatHeader">{chatStarted ? chatUser : ""}</div>

          <div className="messageSections">
            {chatStarted
              ? user.conversations.map((message, index) => {
                  return (
                    <div
                      style={{
                        textAlign:
                          message.user_uid_1 === auth.uid ? "right" : "left",
                      }}
                      key={index}
                    >
                      <p className="messageStyle">{message.message}</p>
                    </div>
                  );
                })
              : null}
          </div>
          {chatStarted ? (
            <div className="chatControls">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write Message"
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          ) : null}
        </div>
      </section>
    </Layout>
  );
}
