import React from "react";
import { FaUsers, FaProjectDiagram, FaChartBar } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Users */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4">
          <FaUsers className="text-blue-600 text-3xl" />
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <p className="text-xl font-semibold">1,245</p>
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4">
          <FaProjectDiagram className="text-green-600 text-3xl" />
          <div>
            <p className="text-gray-500 text-sm">Active Projects</p>
            <p className="text-xl font-semibold">67</p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4">
          <FaChartBar className="text-purple-600 text-3xl" />
          <div>
            <p className="text-gray-500 text-sm">Monthly Traffic</p>
            <p className="text-xl font-semibold">32K views</p>
          </div>
        </div>
      </div>

      {/* Optional: Add more widgets/charts here */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white p-4 rounded-xl shadow text-gray-600">
          <p>[Sample] User "john_doe" signed up today.</p>
          <p>[Sample] Project "Forum Redesign" was updated.</p>
          {/* Replace this with real API data later */}
        </div>
      </div>
    </div>
  );
}