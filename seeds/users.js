const mongoose = require('mongoose');
const mongooseeder = require('mongooseeder');
const models = require('../models');
const { User } = require('../models');

const mongodbUrl = 'mongodb://localhost/assignment_secrets_development';

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: () => {
    const users = [];
    const posts = [];
    const comments = [];

    for (let i = 0; i < 10; i++) {
      const user = new User({
        userName: 'anon' + i,
        password: 'Lastname' + i,
        email: `${i}@nobodywrites.com`,
        posts: []
      });
      users.push(user);
    }
  }
});
