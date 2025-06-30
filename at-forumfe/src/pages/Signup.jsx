import React, { useState } from "react";
import '../assets/css/signup.css';
export default function SignUp() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // uses name attribute
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log("Form Submitted:", formData);
    
  };

  return (
    <div className="signUpContainer">
      <h1>Sign Up</h1>
      <div className="signUpContent">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            required
          />

          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            required
          />

          <label htmlFor="username">UserName:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}