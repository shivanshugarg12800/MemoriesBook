const express = require("express");

const router = express.Router();
// DESCRIPTION - login/landing page
// route - GET /
// when we res.render it will look for the views login and dashboard
router.get("/", (req, res) => {
  res.render("login");
});

// DESCRIPTION - Dashboard
// route - GET /dashboard
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
