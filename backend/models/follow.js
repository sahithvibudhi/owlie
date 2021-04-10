const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FollowSchema = new Schema({
  username: String,
  follow: String,
  accepted: {type: Boolean, default: true},
  updated: { type: Date, default: Date.now() },
});

// Compile model from schema
const Follow = mongoose.model('Follow', FollowSchema );

module.exports = Follow;