const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({});
const Course = new Schema({});
const Admin = new Schema({});
const Purchase = new Schema({});

const UserModel = mongoose.model("users", User);
const CourseModel = mongoose.model("courses", Course);
const AdminModel = mongoose.model("admins", Admin);
const PurchaseModel = mongoose.model("purchases", Purchase);

module.exports = {
  UserModel,
  CourseModel,
  AdminModel,
  PurchaseModel,
};
