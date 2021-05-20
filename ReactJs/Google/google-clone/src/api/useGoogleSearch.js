import React, { useEffect, useState } from "react";
import API_KEY from "./key";

const CONTEXT_KEY = "e3beb5cc456eed485";
function useGoogleSearch(term) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${term}`
      )
        .then((response) => response.json())
        .then((result) => setData(result))
        .catch((error) => console.log(error.message));
    };
    fetchData();
  }, [term]);

  return data;
}

export default useGoogleSearch;
