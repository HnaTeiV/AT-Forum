import "../assets/css/login.css";
import React, { useEffect, useState, useRef } from "react";
import { login } from "../hooks/fetchData";
import "../assets/css/animations.css";
export function Login({ onclose }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [result, setResult] = useState({
    success: false,
    user: {},
    message: "",
  });
  const closeBtnRef = useRef(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const apiLogin = login("http://localhost:5000/api/user/login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await apiLogin(formData);
    setResult(response);
    if (!closeBtnRef.current) return;
    const element = closeBtnRef.current;
    element.classList.remove("fade-in");
    element.classList.add("fade-out");

    // Wait for animation to finish, then close
    setTimeout(() => {
      onclose();
    }, 300); // match your animation duration (0.3s)
  };
  const handleClose = () => {
    if (!closeBtnRef.current) return;
    const element = closeBtnRef.current;
    element.classList.remove("fade-in");
    element.classList.add("fade-out");

    // Wait for animation to finish, then close
    setTimeout(() => {
      onclose();
    }, 300); // match your animation duration (0.3s)
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

      {result && (
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
