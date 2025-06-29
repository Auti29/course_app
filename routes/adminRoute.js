require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { AdminModel, CourseModel } = require("../db");
const { adminMiddleware } = require("../middleware/admin");
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
router.use(express.json());

router.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  const hashedPass = await bcrypt.hash(password, 5);
  try {
    await AdminModel.insertOne({
      email,
      firstName,
      lastName,
      password: hashedPass,
    });
    res.status(200).json({
      message: "signup done!",
    });
  } catch (e) {
    res.status(500).json({
      message: `error occured: ${e.message}`,
    });
  }
});

router.post("/login", async function (req, res) {
  const { email, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Sign up first!" });
    }

    const verifyPass = await bcrypt.compare(password, admin.password);

    if (!verifyPass) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect!" });
    }

    const token = jwt.sign({ id: admin._id }, JWT_ADMIN_SECRET);

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;
  const { title, description, price, imageUrl } = req.body;
  try {
    const course = await CourseModel.create({
      title,
      description,
      price,
      imageUrl,
      creatorId: adminId,
    });
    res.status(200).json({
      message: "course created",
      creatorId: course.creatorId,
    });
  } catch (e) {
    res.status(500).json({
      message: `server error: ${e.message}`,
    });
  }
});

router.put("/course", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;
  const { courseId, ...newCourse } = req.body;
  try {
    const course = await CourseModel.findOne({
      _id: courseId,
      creatorId: adminId,
    });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updates = {};
    let isChanged = false;

    for (const key in newCourse) {
      if (newCourse[key] != course[key]) {
        updates[key] = newCourse[key];
        isChanged = true;
      }
    }

    if (!isChanged) {
      return res.json({ message: "No changes detected" });
    }

    await CourseModel.updateOne({ _id: course._id }, { $set: updates });

    res.json({ message: "course updated", updatedFields: updates });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/course/bulk", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;
  const courses = await CourseModel.find({
    creatorId: adminId,
  });
  if (!courses) {
    return res.json({
      message: "no courses created till now",
    });
  }

  res.json({
    message: "all courses",
    courses,
  });
});

module.exports = {
  adminRouter: router,
};
