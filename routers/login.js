'use strict';

var express = require('express');
var router = express.Router();
let { loggedOutOnly } = require('../services/Session');
const { User, Secret } = require('../models');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

router.get('/', loggedOutOnly, (req, res) => {
  res.render('welcome/login');
});

router.post('/', (req, res) => {
  // 3
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (!user) return res.send('NO USER');

    // 4
    if (user.validatePassword(password)) {
      const sessionId = createSignedSessionId(email);
      res.cookie('sessionId', sessionId);
      res.redirect('welcome/secrets');
    } else {
      res.redirect('/login');
    }
  });
});

module.exports = router;
