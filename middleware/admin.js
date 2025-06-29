require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

function adminMiddleware(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, JWT_ADMIN_SECRET);
  if (decoded) {
    req.adminId = decoded.id;
    next();
  } else {
    return res.status(404).json({
      message: "sign in!!",
    });
  }
}

module.exports = {
  adminMiddleware,
};
