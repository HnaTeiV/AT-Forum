import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);
  return data;
};
const useSearchData = (url, keyword) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (keyword) {
      fetch(`${url}${encodeURIComponent(keyword)}`)
        .then((res) => res.json())
        .then((data) => setData(data));
    } else {
      setData(null);
    }
  }, [url, keyword]);

  return data;
};

export { useFetch, useSearchData };