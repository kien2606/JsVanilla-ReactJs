import React from "react";
import useGoogleSearch from "../../api/useGoogleSearch";
import { useStateValue } from "../../constructors/StateProvider";
import { Link } from "react-router-dom";
import "./SearchPage.css";
import Search from "../../components/search/Search";
import { Avatar, IconButton } from "@material-ui/core";
import AppsIcon from "@material-ui/icons/Apps";
import SearchIcon from "@material-ui/icons/Search";
import YouTubeIcon from "@material-ui/icons/YouTube";
import BookIcon from "@material-ui/icons/Book";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOption from "../../components/searchOptions/SearchOption";
function SearchPage() {
  const [{ term }, dispatch] = useStateValue();
  // get key custom search api in https://developers.google.com/custom-search/v1/introduction#identify_your_application_to_google_with_api_key
  // https://cse.google.com/cse/create/new to create search engine

  const data = useGoogleSearch(term);
  console.log(data);
  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <div className="searchPage__headerUp">
          <div className="searchPage__headerLeft">
            <Link to="/">
              <img
                src="http://pngimg.com/uploads/google/google_PNG19642.png"
                alt="google"
              />
            </Link>
            <div className="searchPage__search">
              <Search hideExceptSearch={false} />
            </div>
          </div>
          <div className="searchPage__headerRight">
            <Link to="/setting">Cài đặt</Link>
            <IconButton>
              <AppsIcon />
            </IconButton>
            <Avatar />
          </div>
        </div>
        <div className="searchPage__headerDown">
          <SearchOption Icon={SearchIcon} title="Tất cả" />
          <SearchOption Icon={YouTubeIcon} title="Video" />
          <SearchOption Icon={BookIcon} title="Sách" />
          <SearchOption Icon={LibraryBooksIcon} title="Tin tức" />
          <SearchOption Icon={MoreVertIcon} title="Thêm" />
        </div>
      </div>
      {term ? (
        <div className="searchPage__results">
          <p className="searchPage__resultsCount">
            Khoảng {data ? data.searchInformation.formattedTotalResults : ""}{" "}
            kết quả ( {data ? data.searchInformation.formattedSearchTime : ""}{" "}
            giây ) được tìm thấy cho "{term ? term : ""}"
          </p>
          {data
            ? data.items.map((item, index) => (
                <div className="searchPage__result" key={index}>
                  <a href={item.link}>{item.displayLink}</a>
                  <a className="searchPage__resultTitle" href={item.link}>
                    <h2>{item.title}</h2>
                  </a>
                  <p className="searchPage__resultSnippet">{item.snippet}</p>
                </div>
              ))
            : ""}
        </div>
      ) : null}
    </div>
  );
}

export default SearchPage;
