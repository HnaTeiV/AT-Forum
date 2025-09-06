import React, { useState, useEffect, useRef } from "react";
import { useSearchData, useFetchWithId } from "../hooks/fetchData";
import { useParams } from "react-router-dom";
import "../assets/css/productDetail.css";
import CreateTopic from "../components/createTopic";
import DetailTopic from "../components/detailTopic";
export default function ProjectDetail() {
  const { keyword } = useParams();
  const data = useSearchData("http://localhost:5000/api/thread/", keyword);
  const [isCreateTopicVisible, setIsCreateTopicVisible] = useState(false);
  const [isDetailTopicVisible, setIsDetailTopicVisible] = useState(false);
  const postData = useFetchWithId("http://localhost:5000/api/post/", data?._id);
  const [isItemData, setIsItemData] = useState(null);
  function handleCreateTopicClick(e) {
    e.preventDefault();
    setIsCreateTopicVisible(!isCreateTopicVisible);
  }
  const handleClick = (post) => {
    setIsDetailTopicVisible(true); // ✅ force open modal
    setIsItemData(post);
    fetch(`http://localhost:5000/api/post/view/${post._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    document.body.style.overflow = "hidden";
  };

  const handleCloseDetailTopic = () => {
    setIsDetailTopicVisible(false);
    document.body.style.overflow = "auto";
  };
  
  return (
    <div className="detailContainer">
      <h1 className="detailTitle">Project Detail</h1>

      {data && data._id ? (
        <div className={`detailCard ${data.title}`} key={data._id}>
          <div className="detailImageContainer">
            <img
              src={`${data.image || "placeholder.jpg"}`}
              alt={data.title}
              className="detailImage"
            />
          </div>
          <div className="detailContent">
            <h1>{data.title}</h1>
            {data.url && (
              <a
                href={data.url}
                className="urlData"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.url}
              </a>
            )}
            <p className="contentData">{data.description}</p>
            <div className="productStatusGroup">
              {data.tags && (
                <h5 className="tagsData">Tags: {data.tags.join(", ")}</h5>
              )}
              <h5 className="statusData">Status: {data.status}</h5>
              <h5 className="viewsData">{data.views} views</h5>
            </div>
          </div>
        </div>
      ) : (
        <p>No results found for "{keyword}".</p>
      )}
      <div className="topicContainer">
        <div className="TopicHeader">
          <h1>Topic</h1>
          <div className="createArea">
            <button onClick={(e) => handleCreateTopicClick(e)}>
              Create Topic
            </button>
          </div>
        </div>
        <div className="topicCard">
          <div className="authorTC">
            <h3>Author:</h3>
          </div>
          <div className="titleTC">
            <h3>Title:</h3>
          </div>
          <div className="contentTC">
            <h3>Content:</h3>
          </div>
          <div className="postDate">
            <h3>Post Date:</h3>
          </div>
          <div className="lastComment">
            <h3>Last Comment:</h3>
          </div>
        </div>
        {postData && postData.length >= 0 ? (
          postData.map((post) => (
            <div
              onClick={() => handleClick(post)}
              className="topicCard"
              key={post._id}
            >
              <div className="authorTC">
                <h3>{post.author.username}</h3>
              </div>
              <div className="titleTC">
                <h2>{post.title}</h2>
              </div>
              <div className="contentTC">
                {post.contents?.[0]?.value || "No content"}
              </div>
              <div className="postDate">
                {new Date(post.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="lastComment">
                <h4>Last Comment:</h4>
                <div className="statusItem">
                  <h4>{post.likes}</h4>
                  <h4>{post.views}</h4>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No topics found.</p>
        )}

        {isCreateTopicVisible && (
          <CreateTopic
            onClose={() => setIsCreateTopicVisible(false)}
            threadId={data._id}
          />
        )}
        {isDetailTopicVisible && (
          <DetailTopic
            onClose={handleCloseDetailTopic}
            threadId={data._id}
            post={isItemData}
          ></DetailTopic>
        )}
      </div>
    </div>
  );
}
