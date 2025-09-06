import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ThreadDetail from "../../components/threadDetail";
import "../../assets/css/admin/threads.css";
export default function Threads() {
  const [Threads, setThreads] = useState([]);
  const [threadId, setThreadId] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/api/thread/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Threads data:", data);
        setThreads(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);
  function handleClick(e, id) {
    e.preventDefault();

    setIsClicked(!isClicked);
    setThreadId(id);
  }
  return (
    <React.Fragment>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Threads Management:</h1>
        <p className="text-gray-600">
          This section will allow you to manage threads.
        </p>
        {/* Add your threads management components here */}
      </div>
      <div className="p-6 threads-container">
        <div onClick={(e) => handleClick(e)} className="thread-item flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:shadow-md">
          <div className="thread-plus-button">+</div>
          <p className="mt-4 text-center text-gray-600">Add a Thread</p>
        </div>
        {Threads.map((item) => (
          <div onClick={(e) => handleClick(e,item._id)} className="thread-item" key={item._id}>
            <h2>{item.title}</h2>
            <img src={item.image} alt={item.title} />
            <p>{item.description}</p>
            <h5>{item.status}</h5>
          </div>
        ))}
      </div>
      {isClicked && <ThreadDetail onClose={() => setIsClicked(false)} threadId={threadId} />}
    </React.Fragment>
  );
}
