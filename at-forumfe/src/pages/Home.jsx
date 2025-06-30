import React, { useEffect } from "react";
import {useFetch} from "../hooks/fetchData";
import '../assets/css/home.css';
import CarouselSlider from "../components/carouselSlider";
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
export default function Home() {
  const data = useFetch("http://localhost:5000/api/thread/top-threads");
  const container=useRef(null);
  useEffect(() => {
    // Optional side-effects here
  }, []);
  useGSAP(() => {
  const element = container.current;
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: "top center",
      end: "top 100px",
      scrub: 1,
    },
    xPercent: -130,
    duration: 0.8,
  });
}, { scope: container });
  return (
    <>
    <h1>HOME</h1>
      <CarouselSlider />
      <div ref={container}  id="item-container" className="item-container">
        {data &&
          data.map((item) => (
            <div className="item" key={item._id}>
              <h2>{item.title}</h2>
              <img src={item.image} alt={item.title} />
              <p>{item.description}</p>
              <h5>{item.status}</h5>
            </div>
          ))}
      </div>
    </>
  );
}