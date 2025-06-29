require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { AdminModel } = require("../db");
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
