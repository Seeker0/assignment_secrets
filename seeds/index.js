'use strict';
const mongoose = require('mongoose');
const mongooseeder = require('mongooseeder');
const models = require('../models');
const { User, Secret } = require('../models');
const faker = require('faker');

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



    let secrets = [];
    for(let i = 0; i < 10; i++){
      const secret = new Secret({
        secret: faker.lorem.paragraph(),
        author: users[i],
        interestedUsers:users[i+1],
        permittedUsers: users[i+2]
      });
      secrets.push(secret);
    }


    const promises = [];
    const collections = [users, secrets];

    collections.forEach(collection=>{
      collection.forEach(model => {
        const promise = model.save();
        promises.push(promise);
    });
  });

    return Promise.all(promises);
  }
});
