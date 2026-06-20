const express = require("express");
const cors = require("cors");
require("dotenv").config();

const checkoutRoute = require("./routes/checkout");
const enquiryRoutes = require("./routes/enquiry");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-admin-api-key"],
  })
);

app.use(express.json());

app.use("/api", checkoutRoute);
app.use("/api", enquiryRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Europe Luxe API Running 🚀" });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Europe Luxe API is healthy",
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});