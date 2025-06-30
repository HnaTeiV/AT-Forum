import React, { useEffect, useState } from "react";
import { useSearchData } from "../hooks/fetchData";
import { useParams } from "react-router-dom";
import '../assets/css/product.css';
export default function Project() {
  const { keyword } = useParams();
  const data = useSearchData("http://localhost:5000/api/thread/", keyword);
  console.log(data);
  return (
    <>
      <h1>Project</h1>
      {data ? (
        <div className="productContainer" key={data._id}>
          <div className="productImageContainer">
            <img src={`/${data.image}`} alt={data.title} />
          </div>
          <div className="productContentContainer">
            <h1>{data.title}</h1>
            <h3 className="urlData">{data.url}</h3>
            <p className="contentData">{data.description}</p>
            <h5 className="tagsData">{`${data.tags[0]},${data.tags[1]}`}</h5>
            <h5 className="statusData">{data.status}</h5>
            <h5 className="viewsData">{data.views}</h5>

          </div>
        </div>
      ) : (
        <p>No results found for "{keyword}".</p>
      )}
    </>
  );
}
