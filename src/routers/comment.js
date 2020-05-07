const express = require("express");
const router = new express.Router();
const Project = require("../models/project");
const User = require("../models/user");
const Comment = require("../models/comment");
const auth = require("../middleWare/auth");

// Create new comment
router.post("/projects/:projectId/comment", auth, async (req, res) => {
  try {
    const user = req.user;

    const comment = new Comment({
      text: req.body.text,
      rating_score: req.body.rating_score,
      commentator_id: user._id,
      project_id: req.params.projectId,
    });

    await comment.save();

    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send({ datasent: req.body, error });
  }
});

// Get all comment in one specific project
router.get("/projects/:projectId/comment", auth, async (req, res) => {
  try {
    // find project
    const project = await Project.findById(req.params.projectId);

    // find commment related to that project
    await project
      .populate({
        path: "comments",
      })
      .execPopulate();
    res.send({
      comments: project.comments,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get only comment that related to specific user
router.get("/projects/:projectId/user/comment/", auth, async (req, res) => {
  try {
    // find commment related to that project
    await req.user
      .populate({
        path: "comments",
      })
      .execPopulate();
    res.send({
      comments: req.user.comments,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
