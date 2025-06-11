import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Project from '../pages/Project';
import Contact from '../pages/Contact';
import More from '../pages/More';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project" element={<Project />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/more" element={<More />} />
    </Routes>
  );
}
