var express = require('express');
var router = express.Router();

router.get("/login", loggedOutOnly, (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  // 3
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (!user) return res.send("NO USER");

    // 4
    if (user.validatePassword(password)) {
      const sessionId = createSignedSessionId(email);
      res.cookie("sessionId", sessionId);
      res.redirect("/secrets");
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;
