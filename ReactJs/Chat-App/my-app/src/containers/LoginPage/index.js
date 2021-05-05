import React, { useState } from "react";
import Layout from "../../components/layouts";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { signin } from "../../app/reducers/auth.slice";
import { Redirect } from "react-router";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  function signinUser(e) {
    e.preventDefault();
    const user = { email, password };
    dispatch(signin(user));
  }
  if (auth.accepted) {
    return <Redirect to={"/"} />;
  }
  return (
    <Layout>
      <form className="login-form container" onSubmit={signinUser}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email : </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password :</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Đăng Nhập
        </button>
      </form>
    </Layout>
  );
}
