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
  if (!token) {
    return res.status(401).json({ message: "Can't split token from header" });
  }
  try {
    // Verify the token and decode payload
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else if (err.name === "NotBeforeError") {
      return res.status(401).json({ message: "Token not active yet" });
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  }
}
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }
    next();
  };
}
module.exports = { authMiddleware, requireRole };
