// this file is starting point.
require("dotenv").config();
require("./db/mongoose");
const express = require("express");

const userRouter = require("./routers/user");
const projectRouter = require("./routers/project");

const app = express();
const port = process.env.PORT || 3000;

// Playground
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || process.env.INFURA_NETWORK_URL);
const chalk = require("chalk");
const createAccount = async () => {
  var create = await web3.eth.accounts.create(["this is my seed phrase"]);
  console.log(chalk.greenBright(JSON.stringify(create, null)));
};

createAccount();

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
