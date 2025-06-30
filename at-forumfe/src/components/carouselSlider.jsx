import React from "react";
import { useState, useEffect, useRef } from "react";
import {useFetch} from "../hooks/fetchData";
import "../assets/css/carousel.css";
export default function CarouselSlider() {
  const data = useFetch("http://localhost:5000/api/thread");
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigationRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const sliderWrapperRef = useRef(null);
  useEffect(() => {
    if (data && data.length > 0) {
      const container = containerRef.current;
      const content = contentRef.current;
      const navItems = navigationRef.current;
      const sliderWrapper = sliderWrapperRef.current;
      if (!container || !content || !navItems || !sliderWrapper) return;

      // Setup initial DOM content
      container.classList.add(`${data[0].title}`);
      navItems.innerHTML = "";
      content.innerHTML = "";
      sliderWrapper.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const navItem = document.createElement("div");
        navItem.className = "nav-item";
        navItem.innerHTML = `<span></span>
        <span>${i + 1}</span>`;
        navItems.appendChild(navItem);
        content.innerHTML += `
        <div class="content-wrapper">
          <h1 class="content-title">${item.title}</h1>
          <p class="content-description">${item.description}</p>
          <div class="status">
            <h4>Facts</h4>
            <ul class="status-items">
              <li class="status-item">
                <span class="status-label">Status:</span>
                <span class="status-value">${item.status}</span>
              </li>
              <li class="status-item">
                <span class="status-label">Views:</span>
                <span class="status-views">${item.views}</span>
              </li>
            </ul>
          </div>
        </div>`;
        sliderWrapper.innerHTML += `
        <li class="slider-item">
          <img src="${item.image}" alt="${item.title}" />`;
      }
      navItems.children[0]?.classList.add("active");
      content.children[0]?.classList.add("show");
      sliderWrapper.children[0]?.classList.add("active");
      let current = 0;

      const handleTransition = (prevIndex, nextIndex) => {
        container.classList.add(`${data[nextIndex].title}`);
        container.classList.remove(`${data[prevIndex].title}`);
        // container.style.backgroundImage = `url(${data[nextIndex].image})`;
        content.children[prevIndex]?.classList.remove("show");
        content.children[nextIndex]?.classList.add("show");
        navItems.children[prevIndex]?.classList.remove("active");
        navItems.children[nextIndex]?.classList.add("active");
        sliderWrapper.children[prevIndex]?.classList.remove("active");
        sliderWrapper.children[nextIndex]?.classList.add("active");
        sliderWrapper.style.setProperty("--index", nextIndex);
      };

      const prevBtn = container.querySelector(".prev-btn");
      const nextBtn = container.querySelector(".next-btn");

      if (!prevBtn || !nextBtn) return;

      const onNextClick = () => {
        const prev = current;
        if (current < data.length - 1) {
          current += 1;
          handleTransition(prev, current);
          prevBtn.disabled = false;
          if (current === data.length - 1) nextBtn.disabled = true;
        }
      };

      const onPrevClick = () => {
        const prev = current;
        if (current > 0) {
          current -= 1;
          handleTransition(prev, current);
          nextBtn.disabled = false;
          if (current === 0) prevBtn.disabled = true;
        }
      };

      prevBtn.disabled = true;
      nextBtn.disabled = false;

      nextBtn.addEventListener("click", onNextClick);
      prevBtn.addEventListener("click", onPrevClick);

      return () => {
        nextBtn.removeEventListener("click", onNextClick);
        prevBtn.removeEventListener("click", onPrevClick);
      };
    }
  }, [data]);

  return (
    <div className="slider-container" ref={containerRef}>
      <div className="navigation">
        <ul className="nav-items" ref={navigationRef}></ul>
        <ul className="content" ref={contentRef}></ul>
      </div>
      <div className="slider">
        <div className="btn-wrapper">
          <button className="prev-btn">Back</button>
          <button className="next-btn">Next</button>
        </div>
        <ul
          className="slider-wrapper"
          ref={sliderWrapperRef}
          style={{ "--index": 0 }}
        ></ul>
      </div>
    </div>
  );
}
