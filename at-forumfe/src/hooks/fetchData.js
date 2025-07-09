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

// hooks/fetchData.js
const useRegisterUser = (url) => {
  return async (userData) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      return { error: "Something went wrong." };
    }
  };
};
const login = (url) => {
  return async (userData) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
        return data;
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      return { error: "Something went wrong." };
    }
  };
};
export { useFetch, useSearchData, useRegisterUser, login };
