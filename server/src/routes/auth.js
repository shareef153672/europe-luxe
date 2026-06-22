const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    const configuredUsername = process.env.ADMIN_USERNAME;
    const configuredPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET;

    if (!configuredUsername || !configuredPasswordHash || !jwtSecret) {
      return res.status(500).json({
        success: false,
        message: "Admin authentication is not configured.",
      });
    }

    if (username !== configuredUsername) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      configuredPasswordHash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    const token = jwt.sign(
      {
        username: configuredUsername,
        role: "admin",
      },
      jwtSecret,
      {
        expiresIn: "8h",
        issuer: "europe-tourz-api",
        audience: "europe-tourz-admin",
      }
    );

    return res.json({
      success: true,
      message: "Login successful.",
      token,
      expiresIn: 28800,
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to complete login.",
    });
  }
});

module.exports = router;