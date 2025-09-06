import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Login } from "../components/login";
import { useFetch, useSearchData } from "../hooks/fetchData";

import "../assets/css/header.css";

const Header = () => {
  const [username, setUsername] = useState("");
  const [keyword, setKeyword] = useState("");
  const data = useFetch("http://localhost:5000/api/thread");
  const listItemRef = useRef(null);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      // You can also update the URL or state to show search results
      navigate(`/project/${encodeURIComponent(keyword)}`);
    }
  };
  function filterAndRender(searchValue) {
    if (searchValue.trim() === "") {
      listItemRef.current.innerHTML = "";
      return;
    }
    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    const listItem = listItemRef.current;

    if (!listItem) return;
    if (filteredData.length === 0) {
      listItem.innerHTML = `<li class="list-item">No results found</li>`;
      return;
    }
    listItem.innerHTML = filteredData
      .map(
        (item) =>
          `<li class="list-item"><a href="/project/${encodeURIComponent(
            item.title
          )}">${item.title}</a></li>`
      )
      .join("");
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setUsername(null);
  };
  function handleSearch(e) {
    const searchValue = e.target.value;
    setKeyword(searchValue);
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUsername = localStorage.getItem("username");
    if (token && savedUsername && savedUsername !== "undefined") {
      setUsername(savedUsername);
    }
  }, []); // ✅ only runs once
  useEffect(() => {
    if (data && data.length > 0) {
      if (!listItemRef) return;
      if (keyword) {
        filterAndRender(keyword);
      } else {
        if (listItemRef.current) {
          listItemRef.current.innerHTML = "";
        }
      }
    }

    // Optional side-effects here
  }, [keyword, data]);

  return (
    <header className="header">
      <div
        className="header-content"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 20px",
          height: "64px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo + Navigation */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="header-logo">AT-Forum</div>
          <nav style={{ marginLeft: "2rem", display: "flex" }}>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="project" className="nav-link">
              Project
            </Link>
            <Link to="contact" className="nav-link">
              Contact
            </Link>
            <Link to="more" className="nav-link">
              More
            </Link>
          </nav>
        </div>

        {/* Search + Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ position: "relative" }}>
            <FaSearch
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#999",
                fontSize: "0.9rem",
              }}
            />
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              onInput={(e) => setKeyword(e.target.value)}
              onChange={(e) => handleSearch(e)}
              onKeyDown={(e) => onKeyDown(e)}
            />
            <ul className="listItemSearch" ref={listItemRef}></ul>
          </div>
          <button onClick={() => navigate("/Signup")} className="signup-btn">
            Sign up
          </button>
          {username ? (
            <div>
              <span>Hello, {username}!</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsLogin(true);
              }}
              className="signin-btn"
            >
              Sign In
            </button>
          )}

          {isLogin === true && (
            <Login
              onclose={() => setIsLogin(false)}
              onLoginSuccess={(username) => {
                
                localStorage.setItem("username", username);
                setUsername(username);
                setIsLogin(false);
              }}
            ></Login>
          )}
          <button onClick={() => navigate("/profile")} className="profile-btn">
            Profile
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
