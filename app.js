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


const app = express();


// ============================================================
// MIDDLEWARE
// ============================================================

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
  });
});


// ============================================================
// ROOT ROUTE
// ============================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Portfolio API",
  });
});

app.use("/api/projects", projectRoutes);
app.use("/api/projects", projectImageRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/contact", contactMessageRoutes);


// ============================================================
// 404 HANDLER
// ============================================================

app.use(notFound);


// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use(errorHandler);


module.exports = app;