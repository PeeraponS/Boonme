const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid.");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
      validate(value) {
        if (value.toLowerCase() === "password") {
          throw new Error("Password can't contain 'password'");
        }
      },
    },
    userpin: {
      type: String,
      minlength: 4,
      trim: true,
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be positive number");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    goodcoin: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("goodcoin must be positive number");
        }
      },
    },
    cash: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("cash must be positive number");
        }
      },
    },
    bc_account: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

// These lines below aren't the actual property for user's model just tell mongoose system that there is
// relationship between user and projects(campain)
userSchema.virtual("projects", {
  ref: "Project",
  localField: "_id", //_id of user
  foreignField: "creator",
});

// this method will called automatically when the object is passed to JSON.stringify
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// instance method
userSchema.methods.generateAuthToken = async function () {
  const user = this;

  // get token
  const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");
  user.tokens = user.tokens.concat({
    token,
  });

  // return token;
  return token;
};

// model method
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({
    email,
  });
  if (!user) throw new Error("Unable to login");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Unable to login");
  return user;
};

// middle ware before
userSchema.pre("save", async function (next) {
  // edit some variable before saving to the mongoDb
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  // tell that finish operation
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
