const express = require("express");
const cors = require("cors");
require("dotenv").config();

const checkoutRoute = require("./routes/checkout");
const enquiryRoutes = require("./routes/enquiry");
const authRoutes = require("./routes/auth");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://europe-tourz.web.app",
  "https://europe-tourz.firebaseapp.com",
  "https://europetourz.com",
  "https://www.europetourz.com",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use(express.json({ limit: "1mb" }));

app.use("/api", checkoutRoute);
app.use("/api", enquiryRoutes);
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Europe Tourz API Running 🚀",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Europe Tourz API is healthy",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "Request origin is not allowed.",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});