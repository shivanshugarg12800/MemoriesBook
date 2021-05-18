const express = require("express");
const passport = require("passport");

const router = express.Router();
// DESCRIPTION - auth with google
// route - GET /auth/google
// we are only setting up /google here because auth will be called in app.js
// here we are saying is we  need the scope of whatever is included in the profile
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// DESCRIPTION - callback with google
// route - GET /auth/google/callback
// the call back that gets hit which when fails redirects to the home page otherwise goes to dashboard
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// DESCRIPTION - logout user
// route   /auth/logout
router.get("/logout", (req, res) => {
  req.logout(); // in built method in req of passport
  res.redirect("/");
});

module.exports = router;
