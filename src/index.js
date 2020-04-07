// this file is starting point.
require("dotenv").config();
require("./db/mongoose");
const express = require("express");

const userRouter = require("./routers/user");
const projectRouter = require("./routers/project");

const app = express();
const port = process.env.PORT || 3000;

// uploading image
// const multer = require("multer");
// const upload = multer({
//   dest: "images",
//   limits: {
//     fileSize: 1000000,
//   },
// });
// app.post("/upload", upload.single("upload"), (req, res) => {
//   res.send();
// });

// automatically parse incoming json to req object.
app.use(express.json());
app.use(userRouter);
app.use(projectRouter);

app.listen(port, () => {
  console.log("Server is up on " + port);
});
