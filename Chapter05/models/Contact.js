const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const contactSchema = new Schema({
   name: {
       type: String,
       required: true
   },
   company: String,
   position: String,
   address: String,
   phoneNumber: String,
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;