const mongoose = require("mongoose");

mongoose.connect(
  process.argv[2] === "local"
    ? "mongodb://127.0.0.1:27017/boonme"
    : "mongodb://heroku_dz1ql4wx:t1qrdo2in3g6o06k372lsrgf16@ds153657.mlab.com:53657/heroku_dz1ql4wx",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);
