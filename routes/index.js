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
    // get the stories of the user logged in
    // lean is used so that it doesnt convert the data to the mongoose docs and sets it to plain js objects
    // it is needed to pass the data to the handlebar template engine
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render("dashboard", {
      name: req.user.firstName,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
