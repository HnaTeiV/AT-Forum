import React, { useState } from "react";
import "../assets/css/createTopic.css";

export default function CreateTopic({ onClose, threadId }) {
  const author = localStorage.getItem("username") || "Anonymous";

  const [formData, setFormData] = useState({
    threadId: threadId || "",
    author: author,
    title: "",
    content: "",
    fileList: [],
  });

  const handleClose = () => {
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleChange = (e) => {
    const { files, name, value } = e.target;

    if (files && files.length > 0) {
      const fileList = Array.from(files).map((file) => file);
      setFormData((prev) => ({
        ...prev,
        fileList,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    if (!formData.title || !formData.content) {
      alert("Please fill in all required fields.");
      return;
    }

    // If uploading files → use FormData instead of JSON
    const data = new FormData();
    data.append("threadId", formData.threadId);
    data.append("author", formData.author);
    data.append("title", formData.title);
    data.append("content", formData.content);

    formData.fileList.forEach((fileObj, index) => {
      data.append("files", fileObj); // File
    });
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }
    try {
      const response = await fetch("http://localhost:5000/api/post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      });

      const result = await response.json();
      onClose();
    } catch (err) {
      console.error("Error creating topic:", err);
    }
  };

  return (
    <div className="overlay">
      <div className="createTopicContainer createTopicBox">
        <h1 className="createTopicTitle">Create Topic</h1>
        <div className="createTopicForm">
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Topic Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            ></textarea>

            <label htmlFor="topicMedia">Image or Video:</label>
            <input
              type="file"
              id="fileList"
              name="fileList"
              onChange={handleChange}
              accept="image/*,video/*"
              multiple
            />

            <div className="buttonGroup">
              <button type="button" onClick={handleClose}>
                Cancel
              </button>
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
