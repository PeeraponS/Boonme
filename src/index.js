// this file is starting point.
require("dotenv").config();
require("./db/mongoose");
const express = require("express");

const userRouter = require("./routers/user");
const projectRouter = require("./routers/project");

const app = express();
const port = process.env.PORT || 3000;

// automatically parse incoming json to req object.
app.use(express.json());
app.use(userRouter);
app.use(projectRouter);
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log("Server is up on " + port);
});
