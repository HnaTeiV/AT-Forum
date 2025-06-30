import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Project from "../pages/Project";
import Contact from "../pages/Contact";
import More from "../pages/More";
import Layout from "../components/layout";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="/project/:keyword" element={<Project />} />
        <Route path="contact" element={<Contact />} />
        <Route path="more" element={<More />} />
      </Route>
    </Routes>
  );
}
