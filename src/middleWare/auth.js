const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log("token");
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded");
    console.log(decoded);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    console.log("user");
    console.log(user);

    if (!user) throw new Error();

    req.token = token; //will be access later
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({
      error: "Please authenticate.",
    });
  }
};

module.exports = auth;
