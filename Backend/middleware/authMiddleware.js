const admin = require("../firebaseAdmin");

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    if (!decodedToken || !decodedToken.uid) {
      return res.status(403).json({ message: "Unauthorized: Invalid token structure" });
    }

    req.user = decodedToken; // This includes uid, email, name, etc.
    next();
  } catch (error) {
    console.error("Firebase token verification failed:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = verifyFirebaseToken;

