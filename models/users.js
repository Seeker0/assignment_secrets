'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  secrets: [{ type: Schema.Types.ObjectId, ref: 'Secret' }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
