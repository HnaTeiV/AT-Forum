import React from "react";
import { useSearchData } from "../hooks/fetchData";
import { useParams } from "react-router-dom";
import '../assets/css/productDetail.css';

export default function ProjectDetail() {
  const { keyword } = useParams();
  const data = useSearchData("http://localhost:5000/api/thread/", keyword);

  return (
    <div className="detailContainer">
      <h1 className="detailTitle">Project Detail</h1>

      {data && data._id ? (
        <div className={`detailCard ${data.title}`} key={data._id}>
          <div className="detailImageContainer">
            <img
              src={`/${data.image || "placeholder.jpg"}`}
              alt={data.title}
              className="detailImage"
            />
          </div>
          <div className="detailContent">
            <h1>{data.title}</h1>
            {data.url && <h3 className="urlData">{data.url}</h3>}
            <p className="contentData">{data.description}</p>
            {data.tags && (
              <h5 className="tagsData">Tags: {data.tags.join(', ')}</h5>
            )}
            <h5 className="statusData">Status: {data.status}</h5>
            <h5 className="viewsData">{data.views} views</h5>
          </div>
        </div>
      ) : (
        <p>No results found for "{keyword}".</p>
      )}
    </div>
  );
}
