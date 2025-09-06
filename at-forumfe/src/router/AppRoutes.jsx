import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Users from "../pages/admin/Users";
import Dashboard from "../pages/admin/Dashboard";
import ProjectDetail from "../pages/ProjectDetail";
import Project from "../pages/Project";
import Contact from "../pages/Contact";
import More from "../pages/More";
import Layout from "../components/layout";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import RequireRole from "../components/RequireRole";
import UnAuthorized from "../pages/UnAuthorized";
import AdminLayout from "../components/adminLayout";
import Threads from "../pages/admin/Threads";
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public/Main Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={
          <RequireRole allowedRoles={["member"]}>
            <Profile />
          </RequireRole>
        } />
        <Route path="project" element={<Project />} />
        <Route path="project/:keyword" element={<ProjectDetail />} />
        <Route path="signup" element={<Signup />} />
        <Route path="unauthorized" element={<UnAuthorized />} />
        <Route path="contact" element={<Contact />} />
        <Route path="more" element={<More />} />
      </Route>

      {/* Admin Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={
          <RequireRole allowedRoles={["admin"]}>
            <Dashboard />
          </RequireRole>
        } />
        <Route path="users" element={
          <RequireRole allowedRoles={["admin"]}>
            <Users />
          </RequireRole>
        } />
        <Route path="threads" element={
          <RequireRole allowedRoles={["admin"]}>
            <Threads /> 
          </RequireRole>
        }> </Route>
      </Route>
    </Routes>
  );
}
