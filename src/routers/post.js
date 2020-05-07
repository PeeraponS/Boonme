const express = require("express");
const router = new express.Router();
const Project = require("../models/project");
const Post = require("../models/post");
const auth = require("../middleWare/auth");

// Create new comment
router.post("/projects/:projectId/post", auth, async (req, res) => {
  try {
    const user = req.user;

    const post = new Post({
      text: req.body.text,
      images: req.body.images,
      writer_id: user._id,
      project_id: req.params.projectId,
    });

    await post.save();

    res.status(200).send(post);
  } catch (error) {
    res.status(400).send({ datasent: req.body, error });
  }
});

// Get all post in one specific project
router.get("/projects/:projectId/post", auth, async (req, res) => {
  try {
    // find project
    const project = await Project.findById(req.params.projectId);

    // find commment related to that project
    await project
      .populate({
        path: "posts",
      })
      .execPopulate();
    res.send({
      posts: project.posts,
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
