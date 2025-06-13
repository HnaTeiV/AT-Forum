import React, { useEffect } from "react";
import fetchData from "../hooks/fetchData";
import '../assets/css/home.css'
export default function Home() {
  const data = fetchData("http://localhost:5000/api/thread");

  useEffect(() => {
    // Optional side-effects here
  }, []);

  return (
    <>
      <h1>HOME</h1>
      <div className="item-container">
        {data &&
          data.map((item) => (
            <div className="item" key={item._id}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <h5>{item.status}</h5>
            </div>
          ))}
      </div>
    </>
  );
}