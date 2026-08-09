require("dotenv").config();

const express = require("express");
const cors = require("cors");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const projectRoutes = require("./routes/project.routes");
const projectImageRoutes = require("./routes/projectImage.routes");



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


// ============================================================
// 404 HANDLER
// ============================================================

app.use(notFound);


// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use(errorHandler);


module.exports = app;