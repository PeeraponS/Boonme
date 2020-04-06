const mongoose = require("mongoose");

mongoose.connect(
  process.argv[2] === "local"
    ? process.env.LOCAL_MONGODB_URL
    : process.env.HEROKU_MLAB_MONGODB_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);
