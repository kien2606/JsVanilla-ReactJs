import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { auth, provider } from "../../api/firebase";
import { login } from "../../features/userSlice";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const signin = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photourl: user.photoURL,
          })
        );
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://www.google.com/gmail/about/static/images/logo-gmail.png?cache=1adba63"
          alt="gmail"
        />
        <Button onClick={signin} color="primary" variant="contained">
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
