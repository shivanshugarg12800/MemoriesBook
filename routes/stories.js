const express = require("express");
const { ensureAuth } = require("../middleware/auth");
const Story = require("../models/Story");

const router = express.Router();
// DESCRIPTION - show add stories page
// route - GET /stories/add

router.get("/add", ensureAuth, (req, res) => {
  res.render("stories/add");
});

// DESCRIPTION - process the add form
// route - POST /stories
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// DESCRIPTION - show public stories page
// route - GET /stories

router.get("/", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
    res.render("stories/index", { stories });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
