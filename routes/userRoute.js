const express = require("express");
const router = express.Router();
router.use(express.json());

router.post("/signup", (req, res) => {
  res.json({
    message: "user signup endpoint",
  });
});

router.post("/login", (req, res) => {
  res.json({
    message: "user login endpoint",
  });
});

router.post("/purchases", (req, res) => {
  res.json({
    message: "purchased courses",
  });
});

module.exports = {
  userRouter: router,
};
