const express = require("express");
const cors = require("cors");
require("dotenv").config();

const checkoutRoute = require("./routes/checkout");
const enquiryRoutes = require("./routes/enquiry");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://europetourz.com",
  "https://www.europetourz.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin like Postman, curl, server-to-server calls
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-admin-api-key"],
  })
);

app.use(express.json());

app.use("/api", checkoutRoute);
app.use("/api", enquiryRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Europe Luxe API Running 🚀",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Europe Luxe API is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err.message);

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});