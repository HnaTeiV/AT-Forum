import React from "react";
import { jwtDecode } from "jwt-decode";
export default function getCurrentUser () {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Failed to parse token:", error);
    return null;
  }
}
