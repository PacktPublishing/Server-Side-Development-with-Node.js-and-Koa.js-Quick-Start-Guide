const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
 fullName: {
  type: String,
  required: true
 },
 email: {
  unique: true,
  type: String,
  required: true
 },
 password: {
  type: String,
  required: true
 },
 createdAt: { type: Date, default: Date.now },
 updatedAt: { type: Date, default: Date.now }
});

schema.plugin(uniqueValidator);
module.exports = mongoose.model('User', schema);