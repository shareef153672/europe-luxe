const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const dataDir = path.join(__dirname, "../../data");
const enquiriesFile = path.join(dataDir, "enquiries.json");

function ensureDataFileExists() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(enquiriesFile)) {
    fs.writeFileSync(enquiriesFile, "[]", "utf-8");
  }
}

function validateAdminApiKey(req, res, next) {
  const adminApiKey = req.headers["x-admin-api-key"];
  const expectedApiKey = process.env.ADMIN_API_KEY;

  if (!expectedApiKey) {
    return res.status(500).json({
      success: false,
      message: "Admin API key is not configured on the server.",
    });
  }

  if (!adminApiKey || adminApiKey !== expectedApiKey) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access. Valid admin API key is required.",
    });
  }

  next();
}

// Public route - website users can submit enquiries
router.post("/enquiry", (req, res) => {
  try {
    ensureDataFileExists();

    const {
      name,
      phone,
      email,
      packageName,
      travelers,
      travelMonth,
      message,
    } = req.body;

    if (!name || !phone || !email || !packageName || !travelers) {
      return res.status(400).json({
        success: false,
        message:
          "Name, phone, email, package name, and number of travelers are required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const phoneRegex = /^[0-9+\-\s()]{7,20}$/;

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number.",
      });
    }

    const enquiries = JSON.parse(fs.readFileSync(enquiriesFile, "utf-8"));

    const newEnquiry = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      packageName: packageName.trim(),
      travelers: String(travelers).trim(),
      travelMonth: travelMonth ? travelMonth.trim() : "",
      message: message ? message.trim() : "",
      status: "new",
      createdAt: new Date().toISOString(),
    };

    enquiries.push(newEnquiry);

    fs.writeFileSync(enquiriesFile, JSON.stringify(enquiries, null, 2));

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully.",
      enquiry: newEnquiry,
    });
  } catch (error) {
    console.error("Enquiry API error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit enquiry. Please try again later.",
    });
  }
});

// Protected route - only admin dashboard should fetch enquiries
router.get("/enquiries", validateAdminApiKey, (req, res) => {
  try {
    ensureDataFileExists();

    const enquiries = JSON.parse(fs.readFileSync(enquiriesFile, "utf-8"));

    return res.json({
      success: true,
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    console.error("Get enquiries error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch enquiries.",
    });
  }
});

module.exports = router;