const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/course/purchase", (req, res) => {
  res.json({
    message: "course purchase endpoint",
  });
});

router.get("/course/preview", (req, res) => {
  res.json({
    message: "course preview endpoint",
  });
});

module.exports = {
  courseRouter: router,
};
