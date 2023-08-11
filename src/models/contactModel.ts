import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'firstName is a required field'],
  },

  lastName: {
    type: String,
  },

  email: {
    type: String,
    required: [true, 'email is a required field'],
    unique: true,
  },

  phone: {
    type: String,
    required: [true, 'phone is a required field'],
    unique: true,
  },
});

const Contact =
  mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;
