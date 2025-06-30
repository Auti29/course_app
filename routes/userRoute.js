require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { userMiddleware } = require("../middleware/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const { UserModel, PurchaseModel } = require("../db");
router.use(express.json());
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

router.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  const hashedPass = await bcrypt.hash(password, 5);
  try {
    await UserModel.insertOne({
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
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Sign up first!" });
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect!" });
    }

    const token = jwt.sign({ id: user._id }, JWT_USER_SECRET);

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/purchases", userMiddleware, async function (req, res) {
  const userId = req.userId;
  // console.log(userId);
  const purchases = await PurchaseModel.find({
    userId,
  })
    .populate("userId")
    .populate("courseId");

  res.json({
    purchases,
  });
});

module.exports = {
  userRouter: router,
};
