const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {type: String, unique: true},
  name: String,
  settings: {},
  location: String,
  app: String,
  updated: { type: Date, default: Date.now() },
});

// Compile model from schema
const User = mongoose.model('User', UserSchema );

module.exports = User;