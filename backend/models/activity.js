const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  username: String,
  app: String,
  location: String,
  updated: { type: Date, default: Date.now() },
});

// Compile model from schema
const Activity = mongoose.model('Activity', ActivitySchema );

module.exports = Activity;