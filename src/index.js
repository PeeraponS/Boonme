// this file is starting point.
require("dotenv").config();
require("./db/mongoose");
const express = require("express");

const userRouter = require("./routers/user");
const projectRouter = require("./routers/project");
const erc20Router = require("./routers/erc20token");
const transactionRouter = require("./routers/transaction");
const commentRouter = require("./routers/comment");

const app = express();
const port = process.env.PORT || 3000;

// automatically parse incoming json to req object.
app.use(express.json());
app.use(userRouter);
app.use(projectRouter);
app.use(erc20Router);
app.use(transactionRouter);
app.use(commentRouter);
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log("Server is up on " + port);
});
