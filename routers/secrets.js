var express = require('express');
var router = express.Router();

router.get('/secrets', (req, res, next){
  res.render("secrets");
});

module.exports = router;
