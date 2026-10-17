require("dotenv").config();

const express = require("express");
const cors = require("cors");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const projectRoutes = require("./routes/project.routes");
const projectImageRoutes = require("./routes/projectImage.routes");
const skillsRoutes = require("./routes/skills.routes");
const experienceRoutes = require("./routes/experience.routes");
const educationRoutes = require("./routes/education.routes");
const contactMessageRoutes = require("./routes/contactMessage.routes");
const profileRoutes = require("./routes/profile.routes");
const technologyRoutes = require("./routes/technology.routes");

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
  process.env.ADMIN_FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
  });
});

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Portfolio API",
  });
});

// API routes
app.use("/api/projects", projectRoutes);
app.use("/api/projects", projectImageRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/contact", contactMessageRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/technologies", technologyRoutes);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

module.exports = app;