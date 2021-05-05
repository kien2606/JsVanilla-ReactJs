import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../app/reducers/auth.slice";
import './style.css';
export default function Header() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#" style={{ color: "#ff778f" }}>
          SWEEPY
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {!auth.accepted ? (
            <ul className="navbar-nav mr-auto menu-login">
              <li className="nav-item active item-log">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li className="nav-item item-log">
                <NavLink to="/register">Register</NavLink>
              </li>
            </ul>
          ) : null}
          <div className="name-user">
            {auth.accepted ? `Hello ${auth.firstName} ${auth.lastName}` : ""}
          </div>
          <ul className="navbar-nav mr-auto">
            {auth.accepted ? (
              <li className="nav-item active">
                <Link
                  to={"#"}
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Log out
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
    </div>
  );
}
