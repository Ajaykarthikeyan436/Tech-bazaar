const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.admin) {
    return next(); // User is admin
  }

  return res.status(403).json({ message: "Forbidden: Admin access only" });
};

module.exports = verifyAdmin;
