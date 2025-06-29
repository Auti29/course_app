require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { userRouter } = require("./routes/userRoute");
const { adminRouter } = require("./routes/adminRoute");
const { courseRouter } = require("./routes/courseRoute");

const DB_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  await mongoose.connect(DB_URL);
  app.listen(PORT);
  //   console.log("done!");
}

main();
