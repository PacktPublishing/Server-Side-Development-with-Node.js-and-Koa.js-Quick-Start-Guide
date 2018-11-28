const mongoose = require('mongoose');

const schema = new mongoose.Schema({
 title: {
   type: String,
   required: true
 },
 content: String,
 image: String,
 author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
 },
 createdAt: { type: Date, default: Date.now },
 updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', schema);