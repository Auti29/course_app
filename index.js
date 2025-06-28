const express = require("express");
const app = express();
const { userRouter } = require("./routes/userRoute");
const { adminRouterRouter } = require("./routes/adminRoute");
const { courseRouter } = require("./routes/courseRoute");

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

app.listen(3000);
