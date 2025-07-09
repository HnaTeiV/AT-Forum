import React, { useEffect, useState } from "react";
import {fetchProfile} from "../hooks/fetchProfile";
export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [message,setMessage]=useState("");
  const [formData,setFormData]=useState({
     fname: "",
    lname: "",
    username: "",
    password: "",
    email: "",
  })
  useEffect(() => {
    
    fetchProfile(setUser,setError,setMessage);
  }, []);
  const handleChange = (e) =>{
    e.preventDefault();
    setFormData({...formData,[e.target.name]:e.target.value});
  }
    const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    console.log("Form Submitted:", formData);
    // // Use the function returned by the hook
    // const response = await registerUser(formData);
    // setResult(response);
  };

  if (error) return <div className="error">{error}</div>;

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="profileContainer">
      <h1>{message}</h1>
      <h1>Sign Up</h1>
      <div className="profileContent">
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
       {/* ✅ Show success result if available */}
      {/* {result && (
        <div className="profileResultBox">
          <h2>✅ Registration Successful!</h2>
          <table>
            <tbody>
              <tr>
                <td>First Name:</td>
                <td>{formData.fname}</td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>{formData.lname}</td>
              </tr>
              <tr>
                <td>Username:</td>
                <td>{formData.username}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{formData.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )} */}
    </div>
  );
}
