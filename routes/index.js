const express = require("express");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Story = require("../models/Story");

const router = express.Router();
// DESCRIPTION - login/landing page
// route - GET /
// when we res.render it will look for the views login and dashboard
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

// DESCRIPTION - Dashboard
// route - GET /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render("dashboard", {
      name: req.user.firstName,
      stories,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
