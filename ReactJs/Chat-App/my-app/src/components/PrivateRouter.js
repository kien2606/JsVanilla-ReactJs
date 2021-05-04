import React from "react";
import { Route, Redirect } from "react-router-dom";
export default function PrivateRouter(props) {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  if (user) {
    return (
      <React.Fragment>
        <Route {...props} />
      </React.Fragment>

    );
  } else {
    return <Redirect to={"/login"} />;
  }
}
