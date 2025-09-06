import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../../assets/css/admin/user.css";
import { updateProfile } from "../../hooks/fetchData";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const { keyword } = useOutletContext();
  const [formData, setFormData] = useState({
    _id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "member",
    image: null,
    ban: "no",
  });
  const filteredUsers = users.filter((user) =>
  user.username.toLowerCase().includes(keyword.toLowerCase())
);
  const uP = updateProfile("http://localhost:5000/api/user/updateUser");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleDelete= (e)=>{
    e.preventDefault();
    const userId = e.target.getAttribute("data-id");
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`http://localhost:5000/api/user/deleteUser/${userId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          setMessage(data.message);
          setUsers(users.filter((user) => user._id !== userId));
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
          setError("Failed to delete user.");
        });
    }
  }
  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setFormData({
      _id: user._id,
      username: user.username || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      role: user.role || "member",
      image: null,
      ban: user.banned ? "yes" : "no",
    });
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setFormData({
      _id: "",
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      role: "member",
      image: null,
      ban: "no",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await uP(formData);
    setMessage(res);
    setEditingUserId(null);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/user/")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
        setLoading(false);
      });
      
  }, [message]);

  return (
    <div className="adminContainer">
      <h1>Admin Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {message && <h2 className="successMsg">{message}</h2>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Image</th>
            <th>Create At</th>
            <th>Last Update</th>
            <th>Last Login</th>
            <th>Banned</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <React.Fragment key={user._id}>
              <tr>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <img src={user.image} alt={user.username} width="50" />
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
                <td>{new Date(user.lastLogin).toLocaleDateString()}</td>
                <td>{user.banned ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button data-id={user._id} onClick={(e)=>handleDelete(e)} className="btn btn-danger">Delete</button>
                </td>
              </tr>

              {editingUserId === user._id && (
                <tr>
                  <td>{formData._id}</td>
                  <td>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="member">Member</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <input type="file" name="image" onChange={handleChange} />
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
                  <td>{new Date(user.lastLogin).toLocaleDateString()}</td>
                  <td>
                    <select
                      name="ban"
                      value={formData.ban}
                      onChange={handleChange}
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </td>
                  <td>
                    <form onSubmit={handleSubmit}>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </form>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
