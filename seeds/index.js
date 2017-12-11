'use strict';
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
    let users = [];

    for (let i = 0; i < 10; i++) {
      const user = new User({
        email: `${i}@user${i}.com`,
        passwordHash: `password${i}`,
        secrets: []
      });
      users.push(user);
    }

    const promises = [];
    // const collections = [users, secrets];

    users.forEach(model => {
      const promise = model.save();
      promises.push(promise);
    });

    return Promise.all(promises);
  }
});
