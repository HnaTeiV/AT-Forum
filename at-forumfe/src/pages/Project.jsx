import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import "../assets/css/product.css";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/thread/")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="projectsContainer">
      <h1>All Projects</h1>

      {loading ? (
        <p>Loading...</p>
      ) : projects.length > 0 ? (
        <div className="productGridContainer">
          {projects.map((item) => (
            <div 
              className={`prodcutContainer ${item.title}`}
              key={item._id}
              onClick={() =>
                navigate(`/project/${encodeURIComponent(item.title)}`)
              }
              style={{ cursor: "pointer" }}
            >
              <div className="productImageContainer">
                <img
                  src={item.image ? `/${item.image}` : "/placeholder.jpg"}
                  alt={item.title}
                />
                <button className="detailBtn">-</button>
                <div className="productContentContainer">
                <h2>{item.title}</h2>
                {item.url && <h3 className="urlData">{item.url}</h3>}
                <p className="contentData">{item.description}</p>
                {item.tags && (
                  <h5 className="tagsData">{item.tags.join(", ")}</h5>
                )}
                <h5 className="statusData">{item.status}</h5>
                <h5 className="viewsData">{item.views} views</h5>
              </div>
              </div>
              
            </div>
          ))}
        </div>
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}
