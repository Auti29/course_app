const express = require("express");
const { CourseModel, UserModel, PurchaseModel } = require("../db");
const router = express.Router();
router.use(express.json());

router.post("/purchase", async function (req, res) {
  const { userId, courseId } = req.body;
  const purchase = await PurchaseModel.create({
    courseId,
    userId,
  });

  res.status(200).json({
    message: "course is purchased successfully!!",
    courseId,
    userId,
  });
});

router.get("/preview", async function (req, res) {
  try {
    const courses = await CourseModel.find({});
    res.status(200).json({
      courses,
    });
  } catch (e) {
    res.status(500).json({
      message: `Error occured: ${e.message}`,
    });
  }
});

module.exports = {
  courseRouter: router,
};
