import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { realTimeUser } from "../../app/reducers/user.slice";
import Layout from "../../components/layouts";
import winter from "../../winter.jpg";
import "./style.css";

export default function Home() {
  const auth = useSelector((state) => state.auth);
  console.log(auth.uid);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(realTimeUser(auth.uid));
  }, []);
  
  const userRendering = user.users.length > 0 ? (
    user.users.map((user,index) => {
      return(
        <div className="displayName" key = {index}>
          <div className="displayPic">
            <img src={winter} alt="" />
          </div>
          <div style={{ margin: "0 10px" }}>
            <span style={{ fontWeight: 500 }}>{user.firstName} {user.lastName}</span>
            <span>{user.isOnline ? "online" : "offline"}</span>
          </div>
      </div>
      )
    })
  ) : null

  return (
    <Layout>
      <section className="wrapper">
        <div className="listOfUsers">
            {userRendering}
        </div>
        <div className="chatArea">
          <div className="chatHeader"> Neik266 </div>
          <div className="messageSections">
            <div style={{ textAlign: "left" }}>
              <p className="messageStyle">Hello User</p>
            </div>
          </div>
          <div className="chatControls">
            <textarea />
            <button>Send</button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
