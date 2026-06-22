const express = require("express");
const { db } = require("../config/firebase");
const authenticateAdmin = require("../middleware/auth");

const router = express.Router();

const allowedStatuses = ["new", "contacted", "confirmed", "closed"];

// Public route: customers can submit enquiries
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

    const currentTime = new Date().toISOString();

    const newEnquiry = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      packageName: packageName.trim(),
      travelers: String(travelers).trim(),
      travelMonth: travelMonth ? travelMonth.trim() : "",
      message: message ? message.trim() : "",
      status: "new",
      adminNotes: "",
      createdAt: currentTime,
      updatedAt: currentTime,
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

// Protected route: fetch all enquiries
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

// Protected route: update enquiry status and internal notes
router.patch("/enquiries/:id", authenticateAdmin, async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const { status, adminNotes } = req.body;

    if (!enquiryId) {
      return res.status(400).json({
        success: false,
        message: "Enquiry ID is required.",
      });
    }

    if (status && !allowedStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Allowed statuses are new, contacted, confirmed, and closed.",
      });
    }

    if (
      adminNotes !== undefined &&
      typeof adminNotes !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Admin notes must be text.",
      });
    }

    const enquiryRef = db.collection("enquiries").doc(enquiryId);
    const enquirySnapshot = await enquiryRef.get();

    if (!enquirySnapshot.exists) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    const updates = {
      updatedAt: new Date().toISOString(),
    };

    if (status) {
      updates.status = status.toLowerCase();
    }

    if (adminNotes !== undefined) {
      updates.adminNotes = adminNotes.trim();
    }

    await enquiryRef.update(updates);

    const updatedSnapshot = await enquiryRef.get();

    return res.json({
      success: true,
      message: "Enquiry updated successfully.",
      enquiry: {
        id: updatedSnapshot.id,
        ...updatedSnapshot.data(),
      },
    });
  } catch (error) {
    console.error("Update enquiry error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update enquiry.",
    });
  }
});

// Protected route: delete spam or test enquiries
router.delete("/enquiries/:id", authenticateAdmin, async (req, res) => {
  try {
    const enquiryId = req.params.id;

    const enquiryRef = db.collection("enquiries").doc(enquiryId);
    const enquirySnapshot = await enquiryRef.get();

    if (!enquirySnapshot.exists) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    await enquiryRef.delete();

    return res.json({
      success: true,
      message: "Enquiry deleted successfully.",
    });
  } catch (error) {
    console.error("Delete enquiry error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete enquiry.",
    });
  }
});

module.exports = router;