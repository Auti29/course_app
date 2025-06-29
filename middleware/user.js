require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

function userMiddleware(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, JWT_USER_SECRET);
  if (decoded) {
    req.userId = decoded.id;
    next();
  } else {
    return res.status(404).json({
      message: "sign in!!",
    });
  }
}

module.exports = {
  userMiddleware,
};
