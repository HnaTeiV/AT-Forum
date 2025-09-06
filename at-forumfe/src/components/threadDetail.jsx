import React, { useEffect, useState } from "react";
import "../assets/css/threadDetail.css";
import { useFetch } from "../hooks/fetchData";

export default function ThreadDetail({ onClose, threadId }) {
  const username = localStorage.getItem("username");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    owner: username || "",
    category: "",
    status: "drafted",
    image: null,
    tags: [],
  });
  const [categories, setCategories] = useState([]);
  const data = useFetch("http://localhost:5000/api/category");
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name === "tags") {
      setFormData({
        ...formData,
        [name]: value.split(",").map((tag) => tag.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!threadId) {
      setErrorMsg("No thread selected to delete.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this thread?")) {
      const response = await fetch(
        `http://localhost:5000/api/thread/${threadId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
          },
        }
      );
      if (response.ok) {
        const message = await response.json();
        setSuccessMsg(message);
        setErrorMsg(""); // clear any previous error
        onClose();
      } else {
        const error = await response.json();
        setErrorMsg(error.message || "Something went wrong.");
        setSuccessMsg("");
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (!threadId) {
      const response = await fetch("http://localhost:5000/api/thread/", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
        },
      });
      if (response.ok) {
        const message = await response.json();
        setSuccessMsg(message);
        setErrorMsg(""); // clear any previous error
        onClose();
      } else {
        setErrorMsg("Something went wrong.");
        setSuccessMsg("");
      }
    } else {
      const response = await fetch("http://localhost:5000/api/thread/", {
        method: "PUT",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
        },
      });
      if (response.ok) {
        const message = await response.json();
        setSuccessMsg(message);
        setErrorMsg(""); // clear any previous error
      } else {
        setErrorMsg("Something went wrong.");
        setSuccessMsg("");
      }
    }
  };
  useEffect(() => {
    if (data) {
      setCategories(data);
    } else {
      console.error("Failed to fetch categories:");
    }
  }, [data]);
  useEffect(() => {
    if (threadId) {
      fetch(`http://localhost:5000/api/thread/${threadId}`)
        .then((res) => res.json()) // ✅ Fix
        .then((data) => {
          console.log("Fetched thread data:", data);
          setFormData({
            title: data.title || "",
            description: data.description || "",
            url: data.url || "",
            owner: data.owner || "",
            category: data.category || "",
            status: data.status || "drafted",
            image: data.image || null,
            tags: Array.isArray(data.tags) ? data.tags.join(", ") : "", // ✅ Safe join
          });
        })
        .catch((error) => {
          console.error("Error fetching thread details:", error);
        });
    }
  }, [threadId]);
  return (
    <div className="Thread-Detail-Container overlay fade-in ">
      {successMsg && (
        <div className="p-2 mb-4 bg-green-100 text-green-700 rounded">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-2 mb-4 bg-red-100 text-red-700 rounded">
          {errorMsg}
        </div>
      )}
      <div className="Thread-Detail-Content bg-white">
        <div className="title-close ">
          <button
            onClick={onClose}
            className="close-button text-xl font-bold float-right"
          >
            ×
          </button>
          <h2 className="Thread-Detail-Title text-2xl font-semibold mb-4">
            Add a Thread
          </h2>
        </div>
        <div className="Thread-Detail-Form">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <label htmlFor="thread-title" className="block mb-1 ">
              Title:
            </label>
            <input
              id="thread-title"
              type="text"
              placeholder="Title"
              className="input-field"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />

            {/* Description */}
            <label htmlFor="thread-description" className="block mt-4 mb-1">
              Description:
            </label>
            <textarea
              id="thread-description"
              name="description"
              placeholder="Description"
              className="input-field"
              value={formData.description}
              onChange={handleChange}
            ></textarea>

            {/* Tags */}
            <label htmlFor="thread-tags" className="block mt-4 mb-1">
              Tags (comma separated):
            </label>
            <input
              id="thread-tags"
              type="text"
              placeholder="Tags (comma separated)"
              className="input-field"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
            />

            {/* URL */}
            <label htmlFor="thread-Url" className="block mt-4 mb-1">
              Thread URL:
            </label>
            <input
              id="thread-Url"
              type="text"
              name="url"
              placeholder="Enter your thread url:"
              className="input-field"
              value={formData.url}
              onChange={handleChange}
            />

            {/* Image Upload */}
            <label htmlFor="thread-image" className="block mt-4 mb-1">
              Upload Image:
            </label>
            <input
              id="thread-image"
              type="file"
              name="image"
              onChange={handleChange}
            />

            <div className="select-group">
              <div className="select-group-container">
                <label htmlFor="thread-status" className="block mt-4 mb-1">
                  Status:
                </label>
                <select
                  id="thread-status"
                  onChange={handleChange}
                  name="status"
                  className="input-field"
                  value={formData.status}
                >
                  <option value="drafted" defaultValue={true}>
                    Drafted
                  </option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="select-group-container">
                <label htmlFor="thread-category" className="block mt-4 mb-1">
                  Category:
                </label>
                <select
                  id="thread-category"
                  name="category"
                  className="input-field"
                  onChange={handleChange}
                  value={formData.category}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="button-group mt-4">
              <button
                type="submit"
                className="submit-button bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="cancel-button bg-gray-300 text-black px-4 py-2 rounded
              mt-4 ml-2"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
