const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleWare/auth");
const multer = require("multer");

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.generateAuthToken();
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token != req.token
    );
    await req.user.save();
    res.send(200).send();
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    await user.save();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ datasent: req.body, error });
  }
});

router.post("/users/:id/depositcash", auth, async (req, res) => {
  try {
    //get user from 'Auth function'
    const user = req.user;

    user.cash = user.cash + req.body.deposit;
    await user.save();
    res.status(200).send({ user });
  } catch (error) {
    res.status(400).send({ datasent: req.body, error });
  }
});

router.post("/users/:id/buytoken", auth, async (req, res) => {
  try {
    //get user from 'Auth function'
    const user = req.user;
    user.goodcoin = user.goodcoin + req.body.goodcoinValue;
    await user.save();
    res.status(200).send({ user: user });
  } catch (error) {
    res.status(400).send({ datasent: req.body, error });
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/:id", async (req, res) => {
  // add some property that doesn't exits in the first place
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const user = await User.findById(req.params.id);
    updates.forEach((key) => (user[key] = req.body[key]));
    user.save();

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/users/:id/updatepin", auth, async (req, res) => {
  // add some property that doesn't exits in the first place
  const updates = Object.keys(req.body);
  const allowedUpdates = ["userpin"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const user = await User.findById(req.params.id);
    updates.forEach((key) => {
      user[key] = req.body[key];
    });
    await user.save();

    if (!user) {
      return res.status(404).send({
        dataSent: req.params,
      });
    }

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error("Please upload an image"));
    }

    // callback(new Error('plase upload an image'))
    callback(undefined, true);
  },
});
router.post(
  "/users/me/uploadavatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    // access file upload and assign to avatar
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/uploadavatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// use
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/jpg");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;
