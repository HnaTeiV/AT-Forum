import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

import ProjectDetail from "../pages/ProjectDetail";
import Project from "../pages/Project";
import Contact from "../pages/Contact";
import More from "../pages/More";
import Layout from "../components/layout";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/project/:keyword" element={<ProjectDetail />} />
        <Route path="/project/" element={<Project />} />

        <Route path="/project/:keyword" element={<Project />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="contact" element={<Contact />} />
        <Route path="more" element={<More />} />
      </Route>
    </Routes>
  );
}
