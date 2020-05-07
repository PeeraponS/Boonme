const express = require("express");
const router = new express.Router();
const Project = require("../models/project");
const Post = require("../models/post");
const Comment = require("../models/comment");
const auth = require("../middleWare/auth");

const { checkBalance } = require("../../connectBlockchain/Mytoken");

// Create new campaign
router.post("/projects", auth, async (req, res) => {
  const project = new Project({
    ...req.body,
    creator: req.user._id,
    due_date: new Date(req.body.due_date),
  });

  try {
    await project.save();
    res.status(201).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET /projects/?complete=true
// GET /projects/?project_type=project_type
router.get("/projects", async (req, res) => {
  // 50%, no filter
  let query = {};
  if (req.query.project_type) {
    query = {
      project_type: req.query.project_type,
    };
  }

  try {
    const projects = await Project.find(query);
    res.send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// sort by diff (date)
router.get("/projects/expiresoon", async (req, res) => {
  try {
    const projects_db = await Project.find({});
    const expired_soon_projects = [];

    // not expired campaign should has positive datediff
    for (let i = 0; i < projects_db.length; i++) {
      let project = projects_db[i].toObject();
      project["datediff"] =
        projects_db[i].due_date.getTime() - new Date().getTime();

      // filtered only not expired campaign and isn't completed
      if (project.is_completed == false && project.datediff > 0)
        expired_soon_projects.push(project);
    }

    // Sort
    expired_soon_projects.sort((a, b) => a.datediff - b.datediff);

    res.send(expired_soon_projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// sort by diff donation
router.get("/projects/donation_almost_max", async (req, res) => {
  try {
    const projects_db = await Project.find({});
    const donation_almost_max_projects = [];

    // not expired campaign should has positive datediff
    for (let i = 0; i < projects_db.length; i++) {
      let project = projects_db[i].toObject();
      project["maxdonate_realdonate_diff"] =
        project["max_donation_amount"] - project["donation_amount"];

      // filtered only not expired campaign and isn't completed
      if (
        project.is_completed == false &&
        project.maxdonate_realdonate_diff > 0
      )
        donation_almost_max_projects.push(project);
    }

    // Sort
    donation_almost_max_projects.sort(
      (a, b) => a.maxdonate_realdonate_diff - b.maxdonate_realdonate_diff
    );

    res.send(donation_almost_max_projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Search campaign
router.get("/projects/search", async (req, res) => {
  const regex = new RegExp(`${req.query.search}*`, "g");

  try {
    const projects = await Project.find({
      name: {
        $regex: regex,
      },
    });
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
          sort,
        },
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

router.get("/projects/favourite", auth, async (req, res) => {
  try {
    const fav_projects = await Project.find({
      "followers.followerId": req.user._id,
    });

    return !fav_projects
      ? res.status(404).send()
      : res.status(200).send(fav_projects);
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

// Favourize by some user
router.patch("/projects/:projectId/favourite", auth, async (req, res) => {
  // add some property that doesn't exits in the first place
  const updates = Object.keys(req.body);
  const allowedUpdates = ["comment"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
    });

    if (!project) {
      return res.status(404).send();
    }
    project.followers = project.followers.concat({
      followerId: req.user._id,
    });
    project.save();
    res.send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Comment by some user
router.patch("/projects/:projectId/comment", auth, async (req, res) => {
  // add some property that doesn't exits in the first place
  const updates = Object.keys(req.body);
  const allowedUpdates = ["donors"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
    });

    if (!project) {
      return res.status(404).send();
    }
    project.followers = project.followers.concat({
      followerId: req.user._id,
    });
    project.save();
    res.send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// check project balance
router.get("/projects/balance/:projectid", async (req, res) => {
  try {
    // refuse any action if not found the project
    const project = await Project.findById(req.params.projectid);
    if (!project) return res.status(400).send();

    // check if the value user want to donate exceed the remaining amonut of donation or not
    const campaign_donation_amount = await checkBalance(project.bc_address);

    res.send({
      campaign_donation_amount,
      campaign_address: project.bc_address,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Edit campaign detail by campaign-owner
router.patch("/projects/:id", auth, async (req, res) => {
  // add some property that doesn't exits in the first place
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed", "name"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const project = await Project.findOne({
      _id: req.params.id,
      creator: req.user._id,
    });

    if (!project) {
      return res.status(404).send();
    }
    updates.forEach((key) => (project[key] = req.body[key]));
    project.save();
    res.send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete campaign  by campaign-owner
router.delete("/projects/:id", auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete({
      _id: req.params.id,
      creator: req.user._id,
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
