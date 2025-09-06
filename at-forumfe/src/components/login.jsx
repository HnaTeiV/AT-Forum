import "../assets/css/login.css";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { login,fetchLikedPosts } from "../hooks/fetchData";
import { useLikes } from "../components/likedContext"; // ✅ Import LikeContext
import "../assets/css/animations.css";

export function Login({ onclose, onLoginSuccess }) {
  const Navigate = useNavigate();
  const { likedPosts,setLikedPosts } = useLikes(); // ✅ Get setter from context

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [result, setResult] = useState({
    success: false,
    user: {},
    message: "",
    token: "",
  });
  const closeBtnRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const apiLogin = login("http://localhost:5000/api/user/login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await apiLogin(formData);

    if (response.success) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("username", response.user.username);
      localStorage.setItem("role", response.user.role);
      onLoginSuccess(response.user.username);

      // 🔹 Fetch liked posts for this user and update context
      try {
        const likedRes = await fetchLikedPosts("http://localhost:5000/api/user/",response.user._id);
        
        if (likedRes) {
          setLikedPosts(
            likedRes.map((post) => post._id || post) // IDs only
          );
          console.log("Fetched liked posts:", likedPosts);
        }
      } catch (err) {
        console.error("Failed to fetch liked posts:", err);
      }

      if (localStorage.getItem("role") === "admin") Navigate("/admin");
      if (localStorage.getItem("role") === "member") Navigate("/");
    }

    // ✅ Close animation
    if (!closeBtnRef.current) return;
    const element = closeBtnRef.current;
    element.classList.remove("fade-in");
    element.classList.add("fade-out");
    setTimeout(() => {
      onclose();
    }, 300);
  };

  const handleClose = () => {
    if (!closeBtnRef.current) return;
    const element = closeBtnRef.current;
    element.classList.remove("fade-in");
    element.classList.add("fade-out");
    setTimeout(() => {
      onclose();
    }, 300);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div ref={closeBtnRef} className="overlay fade-in">
      <div className="signInBox">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={formData.username}
            type="text"
            id="username"
            name="username"
            placeholder="Your Name"
          />
          <input
            onChange={handleChange}
            value={formData.password}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
          <div className="buttonGroup">
            <button type="button" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>

      {result.message && (
        <div className="signInAlert">
          <h2>{result.message}</h2>
          <table>
            <tbody>
              <tr>
                <td>Username:</td>
                <td>{formData.username}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
