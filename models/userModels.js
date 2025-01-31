const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
