const express = require("express");
const router = express.Router();
router.use(express.json());

router.post("/signup", (req, res) => {
  res.json({
    message: "admin signup endpoint",
  });
});
router.post("/login", (req, res) => {
  res.json({
    message: "admin signin endpoint",
  });
});

router.post("/course", (req, res) => {
  res.json({
    message: "admin course creation endpoint",
  });
});
router.put("/course", (req, res) => {
  res.json({
    message: "admin course change endpoint",
  });
});
router.get("/course/bulk", (req, res) => {
  res.json({
    message: "admin all created courses course endpoint",
  });
});

module.exports = {
  adminRouter: router,
};
