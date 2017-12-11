'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const SecretSchema = new Schema({
  secret: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  interestedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  permittedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Secret = mongoose.model('Secret', SecretSchema);
module.exports = Secret;
