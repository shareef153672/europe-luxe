const express = require("express");
const { db } = require("../config/firebase");
const authenticateAdmin = require("../middleware/auth");

const router = express.Router();

// Public route: website users can submit enquiries
router.post("/enquiry", async (req, res) => {
  try {
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

    const newEnquiry = {
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

    const docRef = await db.collection("enquiries").add(newEnquiry);

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully.",
      enquiry: {
        id: docRef.id,
        ...newEnquiry,
      },
    });
  } catch (error) {
    console.error("Enquiry API error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit enquiry. Please try again later.",
    });
  }
});

// Protected route: only authenticated admins can read enquiries
router.get("/enquiries", authenticateAdmin, async (req, res) => {
  try {
    const snapshot = await db
      .collection("enquiries")
      .orderBy("createdAt", "desc")
      .get();

    const enquiries = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

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