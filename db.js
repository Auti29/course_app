const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const User = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});
const Course = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId,
});
const Admin = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});
const Purchase = new Schema({
  userId: { type: ObjectId, ref: "users" },
  courseId: { type: ObjectId, ref: "courses" },
});

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
