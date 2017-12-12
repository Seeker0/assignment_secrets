'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  secrets: [{ type: Schema.Types.ObjectId, ref: 'Secret' }]
});

UserSchema.plugin(uniqueValidator); // attaching unique validator to user schema
// 3
UserSchema.virtual('password').set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 8); // the 8 here is the "cost factor" - create a hash for password
});

// compare the user password with password here
UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

let User = mongoose.model('User', UserSchema);
module.exports = User;
