import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/product.css";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);


  // Lọc theo tag
  const [selectedTag, setSelectedTag] = useState(null);
  const [allTags, setAllTags] = useState([]);

  //  Lọc theo category
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    // Lấy projects
    fetch("http://localhost:5000/api/thread/")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);

        //  Tìm các tag duy nhất
        const tags = new Set();
        data.forEach((item) => {
          if (Array.isArray(item.tags)) {
            item.tags.forEach((tag) => tags.add(tag));
          }
        });
        setAllTags([...tags]);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });

    //  Gọi API lấy danh mục
    fetch("http://localhost:5000/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  //  Lọc dự án theo tag và category
  const filteredProjects = projects.filter((p) => {
    const matchTag = selectedTag ? p.tags?.includes(selectedTag) : true;
  const matchCategory = selectedCategory ? p.category?._id === selectedCategory : true;
 
    return matchTag && matchCategory;
  });

  return (
    <div className="projectsContainer">
      <h1>All Projects</h1>


      <div className="projectLayout">
        <aside className="sidebar">
          {/* Bộ lọc theo danh mục */}
          <h3>Filter by Category</h3>
          <ul className="tag-list">
            <li
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "active" : ""}
            >
              All
            </li>
            {categories.map((cat) => (
              <li
                key={cat._id}
                onClick={() => setSelectedCategory(cat._id)}
                className={selectedCategory === cat._id ? "active" : ""}
              >
                {cat.name}
              </li>
            ))}
          </ul>

          {/* Bộ lọc theo tag */}
          <h3>Filter by Tag</h3>
          <ul className="tag-list">
            <li
              onClick={() => setSelectedTag(null)}
              className={selectedTag === null ? "active" : ""}
            >
              All
            </li>
            {allTags.map((tag) => (
              <li
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={selectedTag === tag ? "active" : ""}
              >
                {tag}
              </li>
            ))}
          </ul>
        </aside>

        {loading ? (
          <p>Loading...</p>
        ) : filteredProjects.length > 0 ? (
          <div className="productGridContainer">
            {filteredProjects.map((item) => (
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
