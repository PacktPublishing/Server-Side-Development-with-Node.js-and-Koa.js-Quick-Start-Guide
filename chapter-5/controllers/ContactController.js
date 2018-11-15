const Contact = require('../models/Contact');

module.exports = {
  async index(ctx) {
    const contacts = await Contact.find();
    ctx.body = {
      status: 'success',
      data: contacts
    };
  },

  async store(ctx) {
    const { body } = ctx.request;
    let contact = new Contact(body);
    contact = await contact.save();
    ctx.body = {
      status: 'success',
      data: contact
    };
  },

  async show(ctx) {
    const { id } = ctx.params;
    const contact = await Contact.findById(id);
    ctx.body = {
      status: 'success',
      data: contact
    };
  },
 
  async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;
    await Contact.findByIdAndUpdate(id, body);
    const contact = await Contact.findById(id);
    ctx.body = {
      status: 'success',
      message: 'contact successfully updated',
      data: contact
    };
  },

  async destroy(ctx) {
    const { id } = ctx.params;
    await Contact.findByIdAndDelete(id);
    ctx.body = {
      status: 'success',
      message: 'contact successfully deleted'
    };
  }
};