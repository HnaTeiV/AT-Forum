import React, { useRef,useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "../assets/css/adminLayout.css";
import { Link,useNavigate } from "react-router-dom";
export default function AdminLayout() {
  const loaderRef = useRef(null);
  const [keyword, setKeyword] = useState("");
  const navigate= useNavigate();
  function handleLogout(e) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  }
  function handleChange(e) {
    e.preventDefault();
    setKeyword(e.target.value);
  }

  useEffect(() => {
    const handleLoad = () => {
      if (loaderRef.current) {
        setTimeout(() => {
          loaderRef.current.classList.add("fadeOut");
        }, 300);
      }
    };

    window.addEventListener("load", handleLoad);
    
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div ref={loaderRef} className="loader">
          <div className="spinner"></div>
        </div>
        <div className="logo">
          {/* <img src="/assets/static/images/logo.svg" alt="Logo" /> */}
          <h3>Adminator</h3>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/users">Users</Link></li>
          <li><Link to="/admin/threads">Threads</Link></li>
          {/* Add more nav items here */}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="topbar">
          <div className="search">
            <input value={keyword} onChange={(e)=>handleChange(e)} type="text" placeholder="Search..." />
          </div>
          <div className="user-menu">
            <button onClick={(e)=>handleLogout(e)}>Logout</button>
          </div>
        </header>
        <div className="content">
          <Outlet context={{keyword}} />
        </div>
      </div>
    </div>
  );
}
