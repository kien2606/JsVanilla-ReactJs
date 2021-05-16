import React, { useEffect } from "react";
import "./App.css";
import Header from "./component/header/Header";
import Sidebar from "./component/sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Mail from "./pages/mail/Mail";
import EmailList from "./pages/emaillist/EmailList";
import SendMail from "./component/sendmail/SendMail";
import { useDispatch, useSelector } from "react-redux";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { login, selectedUser } from "./features/userSlice";
import Login from "./pages/login/Login";
import { auth } from "./api/firebase";

function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectedUser);
  const dispatch = useDispatch();
  // khi da login
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photourl: user.photoURL,
          })
        );
      }
    });
  }, []);
  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="App">
          <Header />
          <div className="app__body">
            <Sidebar />
            <Switch>
              <Route path="/mail">
                <Mail />
              </Route>
              <Route path="/">
                <EmailList />
              </Route>
            </Switch>
          </div>

          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router>
  );
}

export default App;
