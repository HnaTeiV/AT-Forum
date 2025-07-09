// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { updateProfile } from "../hooks/fetchData";
import { fetchProfile } from "../hooks/fetchProfile";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    email: "",
    image: null,
  });
  const uP = updateProfile("http://localhost:5000/api/user/updateUser");
  // Fetch user profile
  useEffect(() => {
    fetchProfile(setUser, setError, setMessage);
  }, []);

  // Prefill form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        fname: user.fname || "",
        lname: user.lname || "",
        username: user.username || "",
        password: "", // never prefill password
        email: user.email || "",
        image: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await uP(formData);
    setMessage(res);
  };

  return (
    <div className="profileContainer">
      {error && <div className="error">{error}</div>}
      {message && <h2 className="successMsg">{message}</h2>}

      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="fname" value={formData.fname} onChange={handleChange} required />

        <label>Last Name:</label>
        <input type="text" name="lname" value={formData.lname} onChange={handleChange} required />

        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Image:</label>
        <input type="file" name="image" onChange={handleChange} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
