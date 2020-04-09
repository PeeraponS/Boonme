const mongoose = require("mongoose");

mongoose.connect(
  process.argv[2] === "local"
    ? process.env.LOCAL_MONGODB_URL
    : process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);
