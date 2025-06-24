const express = require("express");
const verifyFirebaseToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/verifyAdmin");
const setAdmin = require("../controllers/admin")

const adminRouter = express.Router();

adminRouter.post("/setAdmin", setAdmin)

// Example admin-only endpoint
adminRouter.get("/dashboard", verifyFirebaseToken, verifyAdmin, (req, res) => {
  res.status(200).json({
    message: "Welcome, Admin!",
    user: {
      uid: req.user.uid,
      email: req.user.email,
    },
  });
});

module.exports = adminRouter;

