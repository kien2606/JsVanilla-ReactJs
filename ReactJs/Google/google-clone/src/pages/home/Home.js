import React from "react";
import { Link } from "react-router-dom";
import AppsIcon from "@material-ui/icons/Apps";
import "./Home.css";
import { Avatar, IconButton } from "@material-ui/core";
import Search from "../../components/search/Search";
function Home() {
  return (
    <div className="home">
      <div className="home__header">
        <div className="home__headerLeft">
          <Link to="/about">About</Link>
          <Link to="/store">Store</Link>
        </div>
        <div className="home__headerRight">
          <Link to="/gmail">Gmail</Link>
          <Link to="/images">Images</Link>
          <IconButton>
            <AppsIcon />
          </IconButton>
          <Avatar />
        </div>
      </div>
      <div className="home__body">
        <img
          src="http://pngimg.com/uploads/google/google_PNG19642.png"
          alt="google"
        />
        <Search hideExceptSearch={true} title="Search Google or type a URL" />
      </div>
    </div>
  );
}

export default Home;
