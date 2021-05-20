import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import MicIcon from "@material-ui/icons/Mic";
import FacebookIcon from "@material-ui/icons/Facebook";
import SearchOption from "../searchOptions/SearchOption";
import YouTubeIcon from "@material-ui/icons/YouTube";
import GTranslateIcon from "@material-ui/icons/GTranslate";
import AddIcon from "@material-ui/icons/Add";
import "./Search.css";
import { useHistory } from "react-router";
import { useStateValue } from "../../constructors/StateProvider";
import { actionTypes } from "../../constructors/reducer";

function Search({ hideExceptSearch,title }) {
  const [input, setInput] = useState("");
  const [state, dispatch] = useStateValue();
  const history = useHistory();
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.SET_SEARCH_TERM,
      term: input,
    });
    history.push("/search");
  };
  return (
    <form className="search" type="submit" onSubmit={handleSearch}>
      <div className="search__input">
        <SearchIcon className="search__inputIcon" />
        <input
          placeholder={title ? `${title}` : ''}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <MicIcon />
      </div>
      {hideExceptSearch ? (
        <div className="search__options">
          <div className="list__options">
            <SearchOption
              Icon={FacebookIcon}
              color="rgb(71 71 255)"
              title="facebook"
            />
            <SearchOption Icon={YouTubeIcon} color="red" title="youtobe" />
            <SearchOption
              Icon={GTranslateIcon}
              color="rgb(71 71 255)"
              title="translate"
            />
            <SearchOption Icon={AddIcon} color="gray" title="add shortcut" />
          </div>
        </div>
      ) : null}
      {hideExceptSearch ? (
        <div className="google__alert">
          <p>Tìm hiểu cách google bảo vệ bạn trên mạng</p>
        </div>
      ) : null}
    </form>
  );
}

export default Search;
