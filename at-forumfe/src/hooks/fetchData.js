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
const useFetchWithId = (url, id) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (id) {
      fetch(`${url}${encodeURIComponent(id)}`)
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  }, [url, id]);
  return data;  
}
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
const fetchLikedPosts = async (url,userId) => {
  const token = localStorage.getItem("token");
  return fetch(`${url}${encodeURIComponent(userId)}/likes`
  ,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  ).then((res) => res.json());
}
const login = (url) => {
  return async (userData) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          token: data.token,
          user: data.result.user,
          message: data.message,
        };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, error: "Something went wrong." };
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
    const token = localStorage.getItem("token");
    const res = await fetch(url, {
      method: "PUT", 
      headers: {
        Authorization: `Bearer ${token}`, // 👈 Include the token
      },
      body: formData,
    });

    const data = await res.json();
    return data.message || "Profile updated!";
  };
};
export { useFetch, useFetchWithId,useSearchData, useRegisterUser, login, updateProfile,fetchLikedPosts };
