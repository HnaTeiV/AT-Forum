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

      console.log(data)


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
const updateProfile = (url) => {
  return async (userData) => {
    const formData = new FormData();

    for (const key in userData) {
      if (userData[key] !== null) {
        formData.append(key, userData[key]);
      }
    }
    console.log("🔍 FormData before sending:");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File -`, value.name);
      } else {
        console.log(`${key}:`, value);
      }
    }
    const res = await fetch(url, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();
    return data.message || "Profile updated!";
  };
};
export { useFetch, useSearchData, useRegisterUser, login, updateProfile };
