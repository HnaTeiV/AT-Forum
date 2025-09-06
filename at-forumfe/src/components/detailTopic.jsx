import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Image, Video } from "lucide-react";
import "../assets/css/detailTopic.css";

export default function DetailTopic({ onClose, threadId, post }) {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const likeRef = useRef(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Comments state
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentFilter, setCommentFilter] = useState("newest"); // <-- track filter

  // Create comment state
  const [mediaFiles, setMediaFiles] = useState([]);
  const [formData, setFormData] = useState({
    postId: post._id,
    author: username,
    parentCommentId: "",
    content: "",
  });

  // Handle file input
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prev) => [...prev, ...files]);
  };

  // Fetch comments
  const fetchComments = async (filter = commentFilter) => {
    setLoadingComments(true);
    try {
      const url =
        filter === "hotest"
          ? `http://localhost:5000/api/comment/${post._id}/hotestComments`
          : `http://localhost:5000/api/comment/${post._id}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch comments");

      const data = await res.json();
      console.log("Fetched comments:", data);
      setComments(data.comments || []);
    } catch (error) {
      console.error("Error fetching comments: ", error);
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  // Handle filter dropdown change
  const handleFilterChange = (e) => {
    const value = e.target.value === "1" ? "newest" : "hotest";
    setCommentFilter(value);
    fetchComments(value);
  };

  // Submit comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("postId", formData.postId);
    form.append("username", formData.author);
    form.append("content", formData.content);
    mediaFiles.forEach((fileObj) => form.append("files", fileObj));

    try {
      const res = await fetch("http://localhost:5000/api/comment", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const data = await res.json();
      console.log("Created comment:", data);

      // Refresh comments with current filter
      fetchComments(commentFilter);

      // Reset input
      setFormData({ ...formData, content: "" });
      setMediaFiles([]);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  // Toggle like
  const handleClickLike = async () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikeCount((prev) => prev + (newLiked ? 1 : -1));

    try {
      const res = await fetch("http://localhost:5000/api/post/toggleLike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, postId: post._id }),
      });

      if (!res.ok) throw new Error("Backend denied request");

      const data = await res.json();
      setIsLiked(data.liked);
      setLikeCount(data.likeCount);
    } catch (err) {
      console.error("Error toggling like:", err);
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => prev + (newLiked ? -1 : 1));
    }
  };

  // Fetch likes on load
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/post/getPostLike", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ postId: post._id, username }),
        });

        if (!res.ok) return console.error("Failed to fetch likes");

        const data = await res.json();
        setIsLiked(data.liked);
        setLikeCount(data.likeCount);
      } catch (err) {
        console.error("Error fetching likes:", err);
      }
    };

    if (post?._id && username) fetchLikes();
  }, [post._id, username, token]);

  // Initial comments load
  useEffect(() => {
    if (post?._id) fetchComments("newest");
  }, [post._id]);

  if (!post) return null;

  const modal = (
    <div className="overlay" onClick={onClose}>
      <div className="detailTopicBox" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="detailTopicHeader">
          <h2>Detail Topic</h2>
          <button onClick={onClose}>Close</button>
        </div>

        {/* Post Content */}
        <div className="detailTopicContent">
          <div className="avatarContainer">
            <div className="avatarImage"></div>
            <div className="avatarName">{post.author?.username}</div>
            <div className="avatarRole">{post.author?.role}</div>
          </div>

          <div className="topicDetails">
            <h3>{post.title}</h3>

            {/* Text */}
            {post.contents
              ?.filter((item) => item.type === "text")
              .map((item) => (
                <p key={item._id}>{item.value}</p>
              ))}

            {/* Media */}
            {post.contents?.some(
              (item) => item.type === "image" || item.type === "video"
            ) && (
              <div className="mediaGroup">
                {post.contents
                  .filter(
                    (item) => item.type === "image" || item.type === "video"
                  )
                  .map((item) => {
                    if (item.type === "image") {
                      return (
                        <div key={item._id} className="mediaContainer">
                          <img
                            src={`http://localhost:5000/${item.value}`}
                            alt=""
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                          />
                        </div>
                      );
                    }
                    if (item.type === "video") {
                      return (
                        <div key={item._id} className="mediaContainer">
                          <video controls style={{ maxWidth: "100%" }}>
                            <source
                              src={`http://localhost:5000/${item.value}`}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>
            )}

            <div className="topicActions">
              <button
                ref={likeRef}
                onClick={handleClickLike}
                className={`actionButton ${isLiked ? "liked" : ""}`}
              >
                {isLiked ? "Liked" : "Like"} ({likeCount})
              </button>
              <button className="actionButton">Comment</button>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="commentArea">
          <select
            name="filterComment"
            onChange={handleFilterChange}
            value={commentFilter === "newest" ? "1" : "2"}
            id="filterComment"
          >
            <option value="1">Newest comments</option>
            <option value="2">Hottest comments</option>
          </select>

          {loadingComments ? (
            <p>Loading comments...</p>
          ) : comments.length > 0 ? (
            comments.map((item) => (
              <div key={item._id} className="commentContainer">
                <div className="avatarContainer">
                  <div className="avatarImage"></div>
                </div>
                <div className="commentContent">
                  <h4 className="username">
                    {item.author?.username || "Anonymous"}
                  </h4>

                  {item.contents.map((content, idx) => {
                    if (content.type === "image") {
                      return (
                        <div key={idx} className="contents">
                          <img
                            src={`http://localhost:5000/${content.value}`}
                            alt="comment-img"
                            style={{ maxWidth: "200px", borderRadius: "8px" }}
                          />
                        </div>
                      );
                    }
                    if (content.type === "video") {
                      return (
                        <div key={idx} className="contents">
                          <video controls style={{ maxWidth: "300px" }}>
                            <source
                              src={`http://localhost:5000/${content.value}`}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      );
                    }
                    return (
                      <p key={idx} className="contents">
                        {content.value}
                      </p>
                    );
                  })}

                  <div className="commentActions">
                    <button className="commentActionButton">Like</button>
                    <button className="commentActionButton">Reply</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>

        {/* Create Comment */}
        <div className="createComment">
          <div className="avatarContainer">
            <div className="avatarImage"></div>
          </div>

          <div className="createCommentContainer">
            <form onSubmit={handleSubmit} className="commentForm">
              <textarea
                name="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                placeholder="Write a comment..."
                className="createCommentContent"
              />

              <div className="pluginContainer">
                <label className="iconButton">
                  <Image size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    multiple
                    onChange={handleFileChange}
                  />
                </label>

                <label className="iconButton">
                  <Video size={20} />
                  <input
                    type="file"
                    accept="video/*"
                    style={{ display: "none" }}
                    multiple
                    onChange={handleFileChange}
                  />
                </label>

                <button type="submit" className="submitButton">
                  Post
                </button>
              </div>
            </form>

            {mediaFiles.length > 0 && (
              <div className="previewContainer">
                {mediaFiles.map((file, idx) => (
                  <span key={idx} className="previewItem">
                    {file.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
