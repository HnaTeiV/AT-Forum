// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load JWT_SECRET from .env

const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {

  const authHeader = req.headers.authorization;
  // Check for Bearer token in Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token and decode payload
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;
