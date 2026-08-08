const admin = require("../firebaseAdmin");

const setAdmin = async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ message: "UID is required" });
  }

  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log(`✅ Admin role assigned to UID: ${uid}`);

    // ✅ Send response to Postman
    return res.status(200).json({
      message: "Admin role assigned successfully",
      uid,
    });

  } catch (error) {
    console.error("❌ Error assigning admin:", error);
    return res.status(500).json({
      message: "Failed to assign admin role",
      error: error.message,
    });
  }
};

module.exports = setAdmin;
