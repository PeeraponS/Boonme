const express = require("express");
const router = new express.Router();
const Project = require("../models/project");
const auth = require("../middleWare/auth");

router.post("/projects", auth, async (req, res) => {
  // const project = new Project(req.body);
  const project = new Project({
    ...req.body,
    creator: req.user._id
  });

  try {
    await project.save();
    res.status(201).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET /projects/own?complete=true
// GET /projects/own?limit=number&skip=number
router.get("/projects/", async (req, res) => {
  // 50%, no filter
  try {
    const projects = await Project.find({});
    res.send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET /projects/own?complete=true
// GET /projects/own?limit=number&skip=number
// GET /projects/own?sortBy=createdAt:desc
router.get("/projects/own", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "projects",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();
    res.send(req.user.projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/projects/popular", async (req, res) => {
  // 50%, no filter
  try {
    const projects = await Project.find({});
    res.send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/projects/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const project = await Project.findOne({ _id, creator: req.user._id });

    return !project ? res.status(404).send() : res.status(200).send(project);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/projects/:id", auth, async (req, res) => {
  // add some property that doesn't exits in the first place
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed", "name"];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const project = await Project.findOne({
      _id: req.params.id,
      creator: req.user._id
    });

    if (!project) {
      return res.status(404).send();
    }
    updates.forEach(key => (project[key] = req.body[key]));
    project.save();
    res.send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/projects/:id", auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete({
      _id: req.params.id,
      creator: req.user._id
    });

    if (!project) {
      return res.status(404).send();
    }

    res.send(project);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;