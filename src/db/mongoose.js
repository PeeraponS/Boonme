const mongoose = require("mongoose");

mongoose.connect(
  process.argv[2] === "local"
    ? "mongodb://127.0.0.1:27017/boonme"
    : "mongodb://heroku_ncn2fshw:tvufj6ra4eqf5bp1oaboo5cf5m@ds043057.mlab.com:43057/heroku_ncn2fshw",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
);
